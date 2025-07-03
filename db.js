const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1907',
  port: 5432,
});

client.connect()
  .then(() => console.log('✅ Veritabanı bağlantısı db.js üzerinden kuruldu'))
  .catch(err => console.error('❌ DB bağlantı hatası:', err.stack));

module.exports = client;
