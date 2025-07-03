const service = require('../services/kisilerService');

async function listAll(req, res) {
  try {
    const kisiler = await service.listAll();
    res.json(kisiler);
  } catch (err) {
    res.status(500).send('Veri çekme hatası: ' + err.message);
  }
}

async function getById(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('Geçersiz ID');

  try {
    const kisi = await service.getById(id);
    if (!kisi) return res.status(404).send('Kişi bulunamadı');
    res.json(kisi);
  } catch (err) {
    res.status(500).send('Veri çekme hatası: ' + err.message);
  }
}

async function createKisi(req, res) {
  const { ad, soyad, tcno, adres } = req.body;
  if (!ad || !soyad || !tcno || !adres)
    return res.status(400).send('ad, soyad, tcno ve adres zorunludur.');

  try {
    const yeniKisi = await service.createKisi({ ad, soyad, tcno, adres });
    res.status(201).json(yeniKisi);
  } catch (err) {
    res.status(500).send('Kayıt hatası: ' + err.message);
  }
}

async function updateKisi(req, res) {
  const id = parseInt(req.params.id);
  const { ad, soyad, tcno, adres } = req.body;
  if (isNaN(id)) return res.status(400).send('Geçersiz ID');
  if (!ad || !soyad || !tcno || !adres)
    return res.status(400).send('ad, soyad, tcno ve adres zorunludur.');

  try {
    const guncellenen = await service.updateKisi(id, { ad, soyad, tcno, adres });
    if (!guncellenen) return res.status(404).send('Kişi bulunamadı');
    res.json(guncellenen);
  } catch (err) {
    res.status(500).send('Güncelleme hatası: ' + err.message);
  }
}

async function deleteKisi(req, res) {
  const id = parseInt(req.params.id);
  if (isNaN(id)) return res.status(400).send('Geçersiz ID');

  try {
    const silinen = await service.deleteKisi(id);
    if (!silinen) return res.status(404).send('Kişi bulunamadı');
    res.json({ message: 'Kişi başarıyla silindi', deleted: silinen });
  } catch (err) {
    res.status(500).send('Silme hatası: ' + err.message);
  }
}

module.exports = {
  listAll,
  getById,
  createKisi,
  updateKisi,
  deleteKisi,
};

