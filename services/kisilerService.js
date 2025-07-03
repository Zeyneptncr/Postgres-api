const repository = require('../repositories/kisilerRepository');

async function listAll() {
  return await repository.getAll();
}

async function getById(id) {
  return await repository.getById(id);
}

async function createKisi(kisi) {
  // İş kuralları burada yapılabilir
  return await repository.create(kisi);
}

async function updateKisi(id, kisi) {
  return await repository.update(id, kisi);
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
