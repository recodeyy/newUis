const { createClient } = require('@sanity/client');

const client = createClient({
  projectId: 'm2caf2ff',
  dataset: 'production',
  useCdn: true,
  apiVersion: '2024-05-03',
});

async function testConnection() {
  try {
    const data = await client.fetch('*[_type == "post"][0...1]');
    console.log('Sanity Connection: SUCCESS');
    console.log('Sample Data Found:', data.length > 0 ? 'YES' : 'NO (Schema may be empty, but connection works)');
  } catch (error) {
    console.error('Sanity Connection: FAILED');
    console.error('Error Details:', error.message);
  }
}

testConnection();
