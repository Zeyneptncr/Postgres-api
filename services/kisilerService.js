//entitiykisi dosyasındaki kisi sınıfını içe akatarıyor
const Kisi = require('../entity/kisi');
// rpeository veri erişim katmanı , veritabanına erişilir
const repository = require('../repositories/kisilerRepository');

async function listAll() {
  const rows = await repository.getAll();
  return rows.map(row => new Kisi(row));
}

async function getById(id) {
  const row = await repository.getById(id);
  return row ? new Kisi(row) : null;
}

async function createKisi(kisiData) {
  const row = await repository.create(kisiData);
  return new Kisi(row);
}

async function updateKisi(id, kisiData) {
  const row = await repository.update(id, kisiData);
  return row ? new Kisi(row) : null;
}

async function deleteKisi(id) {
  return await repository.remove(id);
}

module.exports = {
  listAll,
  getById,
  createKisi,
  updateKisi,
  deleteKisi,
};
