const express = require('express');
const client = require('./db'); // sadece bu yeterli!
const app = express();
const port = 3000;

app.use(express.json());

// Artık client zaten bağlı, tekrar tanımlamana gerek yok

// Test endpoint
app.get('/', (req, res) => {
  res.send('API çalışıyor 🚀');
});

// Tüm kişileri getir
app.get('/kisiler', async (req, res) => {
  try {
    const result = await client.query('SELECT * FROM kisiler');
    res.json(result.rows);
  } catch (err) {
    res.status(500).send('Veri çekme hatası: ' + err.message);
  }
});

// Yeni kişi ekle
app.post('/kisiler', async (req, res) => {
  const { ad, soyad, tcno, adres } = req.body;

  if (!ad || !soyad || !tcno || !adres) {
    return res.status(400).send('ad, soyad, tcno ve adres zorunludur.');
  }

  try {
    const query = 'INSERT INTO kisiler (ad, soyad, tcno, adres) VALUES ($1, $2, $3, $4) RETURNING *';
    const values = [ad, soyad, tcno, adres];
    const result = await client.query(query, values);
    res.status(201).json(result.rows[0]);
  } catch (err) {
    res.status(500).send('Kayıt hatası: ' + err.message);
  }
});

app.listen(port, () => {
  console.log(`🚀 API şu adreste çalışıyor: http://localhost:${port}`);
});

