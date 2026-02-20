
const { createClient } = require('@supabase/supabase-js')
const fs = require('fs');

const supabaseUrl = 'https://mtzlpogvcyhhjaagmlxn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10emxwb2d2Y3loaGphYWdtbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjEwODAsImV4cCI6MjA4NjkzNzA4MH0.J5C0gveHh3zFABsBbN7teYVYxWlWcApTElCGmsj_cLA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function inspectMetadata() {
    console.log("Fetching documents...")

    const { data, error } = await supabase
        .from('documents')
        .select('*')
        .limit(1)

    if (error) {
        console.error('Error:', error)
    } else {
        console.log('Success! Found ' + data.length + ' documents.')
        const output = data;
        fs.writeFileSync('debug_metadata_output.json', JSON.stringify(output, null, 2));
        console.log('Metadata written to debug_metadata_output.json');
    }
}

inspectMetadata()
