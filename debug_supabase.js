
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://mtzlpogvcyhhjaagmlxn.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im10emxwb2d2Y3loaGphYWdtbHhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzEzNjEwODAsImV4cCI6MjA4NjkzNzA4MH0.J5C0gveHh3zFABsBbN7teYVYxWlWcApTElCGmsj_cLA'

const supabase = createClient(supabaseUrl, supabaseKey)

async function testConnection() {
    console.log("Testing connection to 'documents' table...")

    const { data, error } = await supabase
        .from('documents')
        .select('*')
        .limit(5)

    if (error) {
        console.error('Error connecting to Supabase:', error)
    } else {
        console.log('Successfully connected!')
        console.log('Returned ' + data.length + ' rows.')
        if (data.length > 0) {
            console.log('First row structure:', JSON.stringify(data[0]))
        } else {
            console.log('Table is empty.')
        }
    }
}

testConnection()
