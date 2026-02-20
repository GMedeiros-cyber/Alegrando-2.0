const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');
const fetch = require('node-fetch');

// Config
const SUPABASE_URL = 'https://mtzlpogvcyhhjaagmlxn.supabase.co';
const SUPABASE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10emxwb2d2Y3loaGphYWdtbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjEwODAsImV4cCI6MjA4NjkzNzA4MH0.J5C0gveHh3zFABsBbN7teYVYxWlWcApTElCGmsj_cLA';
const WEBHOOK_URL = 'https://n8n.webhook.agenciacubo.com.br/webhook/jade-chat-v2';

const _supabase = createClient(SUPABASE_URL, SUPABASE_KEY);

const REPORT_FILE = 'test_jade_full_report.md';
const ERROR_FILE = 'test_jade_full_errors.txt';

let results = {
    total: 0,
    correct: 0,
    inconsistent: 0,
    details: [],
    errors: []
};

async function sendToJade(message) {
    try {
        const controller = new AbortController();
        const timeoutId = setTimeout(() => controller.abort(), 20000); // 20s timeout

        const response = await fetch(WEBHOOK_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                chatId: 'test_auto_' + Date.now(),
                message: message,
                route: 'general',
                contexto: {}
            }),
            signal: controller.signal
        });
        clearTimeout(timeoutId);

        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        return await response.json();
    } catch (error) {
        return { error: error.message };
    }
}

function analyzeResponse(response, expectedDestination) {
    if (response.error) {
        return {
            status: 'ERROR',
            output: JSON.stringify(response),
            notes: 'Webhook failure: ' + response.error
        };
    }

    const output = response.output || "";
    if (!output) {
        return {
            status: 'ERROR',
            output: JSON.stringify(response),
            notes: 'Empty output from Webhook'
        };
    }

    const lowerOutput = output.toLowerCase();

    // Checks
    const hasPrice = lowerOutput.includes("reais") || lowerOutput.includes("r$"); // Basic detection
    const isBrief = output.split('\n').filter(l => l.trim()).length <= 6; // Rough block count
    const triedColeta = lowerOutput.includes("nome") || lowerOutput.includes("email") || lowerOutput.includes("telefone") || lowerOutput.includes("quantos alunos");

    let status = 'OK';
    let notes = [];

    if (!hasPrice && !lowerOutput.includes("sob consulta")) notes.push("Preço não detectado");
    if (!isBrief) notes.push("Pode estar muito longa");
    if (triedColeta) {
        status = 'INCONSISTENT';
        notes.push("Tentou coletar dados indevidamente");
    }

    return {
        status,
        output,
        notes: notes.join(', ')
    };
}

async function runTests() {
    console.log("🔍 Iniciando testes de IA Jade...");
    fs.writeFileSync(REPORT_FILE, `# Relatório de Testes Jade - ${new Date().toISOString()}\n\n`);
    fs.writeFileSync(ERROR_FILE, ``);

    // 1. Fetch Destinations
    console.log("📂 Buscando destinos no Supabase...");
    const { data: destinations, error } = await _supabase
        .from('documents')
        .select('id, content, tipo_passeio, categoria');

    if (error || !destinations) {
        console.error("❌ Erro ao buscar destinos:", error);
        return;
    }

    console.log(`📋 ${destinations.length} destinos encontrados.`);
    results.total = destinations.length;

    // Filter unique titles
    const uniqueDestinations = [];
    const seen = new Set();

    destinations.forEach(d => {
        const content = d.content || "";
        const firstLine = content.split('\n')[0] || "";
        let title = firstLine.replace(/^#\s*/, '').replace('Passeio', '').trim();
        title = title.replace(/\(\d+\)$/, '').trim();

        if (title && title.length > 2 && !seen.has(title)) {
            seen.add(title);
            uniqueDestinations.push(title);
        }
    });

    // Limit for safety/time if too many, but user said "Testar TODOS". 
    // Assuming reasonable number (e.g. < 50). If > 50, standard webhook limits might apply.
    // I will batch them or run sequentially.

    for (const title of uniqueDestinations) {
        console.log(`🧪 Testando: ${title}...`);

        const question = `Quanto custa o ${title}?`;
        const res = await sendToJade(question);
        const analysis = analyzeResponse(res, title);

        results.details.push({
            name: title,
            status: analysis.status,
            notes: analysis.notes,
            output: analysis.output
        });

        if (analysis.status === 'OK') results.correct++;
        else results.inconsistent++;

        if (analysis.status !== 'OK') {
            fs.appendFileSync(ERROR_FILE, `[${title}] ${analysis.notes}\nOutput: ${analysis.output}\n\n`);
        }

        // Delay to avoid rate limits
        await new Promise(r => setTimeout(r, 1000));
    }

    // 2. Intent Tests
    console.log("🧪 Testando Intenções...");
    const intentTests = [
        { q: "Quero levar 30 alunos para o ZOOLÓGICO em maio.", check: (r) => !r.toLowerCase().includes("qual a data") },
        { q: "Sou da Escola X e quero reservar.", check: (r) => r.toLowerCase().includes("roteiro") || r.toLowerCase().includes("botão") },
        { q: "Os ônibus são seguros?", check: (r) => r.toLowerCase().includes("seguro") && !r.toLowerCase().includes("frota própria") },
        { q: "Vocês fazem excursão para Disney?", check: (r) => r.toLowerCase().includes("não") || r.toLowerCase().includes("foco") }
    ];

    for (const t of intentTests) {
        const res = await sendToJade(t.q);
        const output = res.output || "";
        const passed = t.check(output);

        results.details.push({
            name: `INTENT: ${t.q}`,
            status: passed ? 'OK' : 'FAIL',
            notes: passed ? '' : 'Resposta inesperada',
            output: output
        });

        if (passed) results.correct++; else results.inconsistent++;
    }

    // Generate Report
    const score = ((results.correct / (results.total + intentTests.length)) * 100).toFixed(1);

    let md = `## 📊 Resumo Geral\n`;
    md += `- Total de Testes: ${results.total + intentTests.length}\n`;
    md += `- Respostas Corretas/Aceitáveis: ${results.correct}\n`;
    md += `- Inconsistências: ${results.inconsistent}\n`;
    md += `- Pontuação de Conformidade: **${score}%**\n\n`;

    md += `## 📋 Detalhes\n| Teste | Status | Obs |\n|---|---|---|\n`;
    results.details.forEach(d => {
        md += `| ${d.name} | ${d.status} | ${d.notes} |\n`;
    });

    md += `\n## 🚨 Erros Encontrados\nVer arquivo ${ERROR_FILE} para outputs completos.\n`;

    fs.appendFileSync(REPORT_FILE, md);
    console.log(`✅ Testes concluídos. Relatório salvo em ${REPORT_FILE}`);
}

runTests();
