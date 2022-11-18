const { salesService } = require('../services');

const getAllSales = async (_req, res) => {
  const { message } = await salesService.getAllSales();
  res.status(200).json(message);
};

const getByIdSales = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getByIdSales(id);
  if (type) return res.status(404).json({ message: 'Sale not found' });
  res.status(200).json(message);
};

const deleteByIdSales = async (req, res) => {
  const { id } = req.params;
  const { type } = await salesService.deleteByIdSales(id);
  if (type) return res.status(404).json({ message: 'Sale not found' });
  return res.status(204).json({ message: 'Sale deletado com sucesso' });
};

const insert = async (req, res) => {
  const { body } = req;
  const { message } = await salesService.insert(body);
  res.status(201).json(message);
};

module.exports = {
  getAllSales,
  getByIdSales,
  deleteByIdSales,
  insert,
};