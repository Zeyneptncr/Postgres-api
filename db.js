const { Client } = require('pg');

const client = new Client({
  user: 'postgres',
  host: 'localhost',
  database: 'postgres',
  password: '1907',
  port: 5432,
});

client.connect()
  .then(() => console.log(' Veritabanı bağlantısı kuruldu'))
  .catch(err => console.error(' Veritabanı bağlantı hatası:', err.stack));

module.exports = client;

