
const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const supabaseUrl = 'https://mtzlpogvcyhhjaagmlxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10emxwb2d2Y3loaGphYWdtbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjEwODAsImV4cCI6MjA4NjkzNzA4MH0.J5C0gveHh3zFABsBbN7teYVYxWlWcApTElCGmsj_cLA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCategories() {
    let output = "🔍 Iniciando teste de categorias e destinos Supabase...\n";

    const tipos = ['pedagogico', 'lazer'];

    for (const tipo of tipos) {
        output += `\n--- TIPO DE PASSEIO: ${tipo.toUpperCase()} ---`;

        // 1. Fetch all Unique Categories
        const { data: catData, error: catError } = await supabase
            .from('documents')
            .select('categoria')
            .eq('tipo_passeio', tipo);

        if (catError) {
            output += `\nErro ao buscar categorias para ${tipo}: ${catError.message}`;
            continue;
        }

        if (!catData || catData.length === 0) {
            output += `\n⚠️ Nenhuma categoria encontrada para ${tipo}.`;
            continue;
        }

        const uniqueCats = [...new Set(catData.map(d => d.categoria).filter(c => c))];

        if (uniqueCats.length === 0) {
            output += `\n⚠️ Nenhuma categoria válida encontrada para ${tipo} (apenas nulos/vazios).`;
            continue;
        }

        output += `\n✅ Categorias encontradas (${uniqueCats.length}): ${uniqueCats.join(', ')}`;

        // 2. For each category, fetch destinations to verify content
        for (const cat of uniqueCats) {
            output += `\n  📂 Categoria: "${cat}"`;

            const { data: destData, error: destError } = await supabase
                .from('documents')
                .select('id, content, destaque')
                .eq('tipo_passeio', tipo)
                .eq('categoria', cat)
                .order('destaque', { ascending: false });

            if (destError) {
                output += `\n  ❌ Erro ao buscar destinos: ${destError.message}`;
                continue;
            }

            output += `\n  📊 Total de destinos: ${destData.length}`;

            const destacados = destData.filter(d => d.destaque).length;
            output += `\n  🌟 Destaques: ${destacados}`;

            if (destData.length > 0) {
                output += `\n  📝 Exemplo de títulos:`;
                destData.slice(0, 5).forEach((d, i) => {
                    const content = d.content || "";
                    const firstLine = content.split('\n')[0] || "";
                    let title = firstLine.replace(/^#\s*/, '').replace('Passeio', '').trim();
                    title = title.replace(/\(\d+\)$/, '').trim();

                    const isFeatured = d.destaque ? '[★]' : '[ ]';
                    output += `\n    ${i + 1}. ${isFeatured} ${title} (ID: ${d.id})`;
                });
            }

            if (destData.length > 5) output += `\n    ... e mais ${destData.length - 5} opções.`;
        }
    }

    // Write to file explicitly as utf-8
    fs.writeFileSync('test_results_clean.txt', output, 'utf8');
    console.log("Teste concluído. Veja test_results_clean.txt");
}

testCategories();
