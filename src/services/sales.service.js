const { salesModel } = require('../models');

const insert = async (body) => {
  const saleId = await salesModel.insert(body);
  const sale = await salesModel.getByIdPostSales(saleId);
  const registeredSale = {
    id: saleId,
    itemsSold: sale,
  };
  return { type: null, message: registeredSale };
};

const getAllSales = async () => {
  const result = await salesModel.getAllSales();
  return { type: null, message: result };
};

const getByIdSales = async (id) => {
  const result = await salesModel.getByIdSales(id);
  if (!result.length > 0) return { type: 'Mensagem Service erro' };
  return { type: null, message: result };
};

const deleteByIdSales = async (id) => {
  const result = await salesModel.getByIdSales(id);
  if (!result.length > 0) return { type: 'ID_NOT_FOUND', message: 'id not found' };
  await salesModel.deleteByIdSales(id);
  return { type: null, message: 'Deletado com sucesso' };
};

module.exports = {
  getAllSales,
  getByIdSales,
  deleteByIdSales,
  insert,
};