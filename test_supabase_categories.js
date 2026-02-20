
const { createClient } = require('@supabase/supabase-js');

const supabaseUrl = 'https://mtzlpogvcyhhjaagmlxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10emxwb2d2Y3loaGphYWdtbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjEwODAsImV4cCI6MjA4NjkzNzA4MH0.J5C0gveHh3zFABsBbN7teYVYxWlWcApTElCGmsj_cLA';

const supabase = createClient(supabaseUrl, supabaseKey);

async function testCategories() {
    console.log("🔍 Iniciando teste de categorias e destinos Supabase...\n");

    const tipos = ['pedagogico', 'lazer']; //, 'lazer'

    for (const tipo of tipos) {
        console.log(`\n--- TIPO DE PASSEIO: ${tipo.toUpperCase()} ---`);

        // 1. Fetch all Unique Categories
        const { data: catData, error: catError } = await supabase
            .from('documents')
            .select('categoria')
            .eq('tipo_passeio', tipo);

        if (catError) {
            console.error(`Erro ao buscar categorias para ${tipo}:`, catError.message);
            continue;
        }

        const uniqueCats = [...new Set(catData.map(d => d.categoria).filter(c => c))];

        if (uniqueCats.length === 0) {
            console.log(`⚠️ Nenhuma categoria encontrada para ${tipo}.`);
            continue;
        }

        console.log(`✅ Categorias encontradas (${uniqueCats.length}):`, uniqueCats.join(', '));

        // 2. For each category, fetch destinations to verify content
        for (const cat of uniqueCats) {
            console.log(`\n  📂 Categoria: "${cat}"`);

            const { data: destData, error: destError } = await supabase
                .from('documents')
                .select('id, content, destaque')
                .eq('tipo_passeio', tipo)
                .eq('categoria', cat)
                .order('destaque', { ascending: false });

            if (destError) {
                console.error(`  ❌ Erro ao buscar destinos:`, destError.message);
                continue;
            }

            console.log(`  📊 Total de destinos: ${destData.length}`);

            const destacados = destData.filter(d => d.destaque).length;
            console.log(`  🌟 Destaques: ${destacados}`);

            // List first 3 titles to verify parsing
            destData.slice(0, 3).forEach((d, i) => {
                const content = d.content || "";
                const firstLine = content.split('\n')[0] || "";
                let title = firstLine.replace(/^#\s*/, '').replace('Passeio', '').trim();
                title = title.replace(/\(\d+\)$/, '').trim();
                console.log(`    ${i + 1}. [${d.destaque ? '★' : ' '}] ${title} (ID: ${d.id})`);
            });

            if (destData.length > 3) console.log(`    ... e mais ${destData.length - 3} opções.`);
        }
    }
}

testCategories();
