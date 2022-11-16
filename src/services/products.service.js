const { productsModel } = require('../models');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

const findById = async (id) => {
  const result = await productsModel.findById(id);
  if (result) return { type: null, message: result };
  return { type: 'Mensagem Service erro' };
};

const insert = async (name) => {
  const productId = await productsModel.insert(name);
  const product = await productsModel.findById(productId);
  return { type: null, message: product };
};

const updateById = async (name, id) => {
  await productsModel.updateById(name, id);
  const produtUpdated = await productsModel.findById(id);
  if (!produtUpdated) return { type: 'ID_NOT_FOUND', message: 'id not found' };
  return { type: null, message: produtUpdated };
};

const deleteById = async (id) => {
  const result = await productsModel.findById(id);
  if (!result) return { type: 'ID_NOT_FOUND', message: 'id not found' };
  await productsModel.deleteById(id);
  return { type: null, message: 'Deletado com sucesso' };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
  deleteById,
};