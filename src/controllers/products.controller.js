const { productsService } = require('../services');
const errorMap = require('../utils/errorMap');

const findAll = async (_req, res) => {
  // const { type, message } = await productsService.findAll();
  // if (type) return res.status(errorMap.mapError(type)).json(message);
  // res.status(200).json(message);
  console.log('Eu sou o controller');
};

module.exports = {
  findAll,
};