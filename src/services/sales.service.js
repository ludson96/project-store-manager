const { salesModel } = require('../models');
const { validateProductId } = require('./validations/sales.validation');

const insert = async (body) => {
  const { type, message } = await validateProductId(body);
  if (type !== undefined) return { type, message };
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

const updateByIdSales = async (sales, id) => {
  const { type, message } = await validateProductId(sales);
  if (type !== undefined) return { type, message };
  const idVerified = await salesModel.getByIdPostSales(sales, id);
  if (!idVerified.length > 0) return { type: 'ID_NOT_FOUND', message: 'Sale not found' };
  await salesModel.updateByIdSales(sales, id);
  const saleUpdated = await salesModel.getByIdPostSales(id);
  const result = {
    saleId: Number(id),
    itemsUpdated: saleUpdated,
  };
  return { type: null, message: result };
};

module.exports = {
  getAllSales,
  getByIdSales,
  deleteByIdSales,
  insert,
  updateByIdSales,
};