const client = require('../db');

async function getAll() {
  const result = await client.query('SELECT * FROM kisiler');
  return result.rows;
}

async function getById(id) {
  const result = await client.query('SELECT * FROM kisiler WHERE id = $1', [id]);
  return result.rows[0];
}

async function create(kisi) {
  const { ad, soyad, tcno, adres } = kisi;
  const result = await client.query(
    'INSERT INTO kisiler (ad, soyad, tcno, adres) VALUES ($1, $2, $3, $4) RETURNING *',
    [ad, soyad, tcno, adres]
  );
  return result.rows[0];
}

async function update(id, kisi) {
  const { ad, soyad, tcno, adres } = kisi;
  const result = await client.query(
    'UPDATE kisiler SET ad = $1, soyad = $2, tcno = $3, adres = $4 WHERE id = $5 RETURNING *',
    [ad, soyad, tcno, adres, id]
  );
  return result.rows[0];
}

async function remove(id) {
  const result = await client.query('DELETE FROM kisiler WHERE id = $1 RETURNING *', [id]);
  return result.rows[0];
}

module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
