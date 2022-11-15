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

module.exports = {
  findAll,
  findById,
};