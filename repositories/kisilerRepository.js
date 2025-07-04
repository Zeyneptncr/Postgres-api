// bu katman veritabanı işlemlerini gerçekleştiiryor. 
// db.js dosyasından veritabanı bağlantısı alıyor.

const client = require('../db');

// getAll veritabnaındaki kisiler tablosundaki tüm satırları getirir
// client.query ile sql sorgusu
// res.row sorgu sonucundaki satırları döndürülür.
async function getAll() {
  const res = await client.query('SELECT * FROM kisiler');
  return res.rows;
}
// getById verilen idye sahip kişiyi getiriir.
async function getById(id) {
  const res = await client.query('SELECT * FROM kisiler WHERE id = $1', [id]);
  return res.rows[0];
}
// creata yeni kişi oluşturur.
async function create(kisi) {
  const { ad, soyad, tcno, adres } = kisi;
  const res = await client.query(
    'INSERT INTO kisiler (ad, soyad, tcno, adres) VALUES ($1, $2, $3, $4) RETURNING *',
    [ad, soyad, tcno, adres]
  );
  return res.rows[0];
}
// update verilen id deki kaydı günceller.
async function update(id, kisi) {
  const { ad, soyad, tcno, adres } = kisi;
  const res = await client.query(
    'UPDATE kisiler SET ad=$1, soyad=$2, tcno=$3, adres=$4 WHERE id=$5 RETURNING *',
    [ad, soyad, tcno, adres, id]
  );
  return res.rows[0];
}
// remover id deki kaydı siler ve silinen kaydı döndürür
async function remove(id) {
  const res = await client.query('DELETE FROM kisiler WHERE id=$1 RETURNING *', [id]);
  return res.rows[0];
}
// module.exports fonksiyonları dışa aktarır
module.exports = {
  getAll,
  getById,
  create,
  update,
  remove,
};
