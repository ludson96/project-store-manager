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
  const result = await productsModel.updateById(name, id);
  if (!result) return { type: 'id inexistente' };
  return { type: null, message: result };
};

module.exports = {
  findAll,
  findById,
  insert,
  updateById,
};