const { salesModel } = require('../models');

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return { type: null, message: result };
};

const getByIdSales = async (id) => {
  const result = await salesModel.getByIdSales(id);
  console.log('Eu sou o result de service: ', result);
  if (!result.length > 0) return { type: 'Mensagem Service erro' };
  return { type: null, message: result };
};

module.exports = {
  getAllSales,
  getByIdSales,
};