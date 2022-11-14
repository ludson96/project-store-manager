const { productsModel } = require('../models');

const findAll = async () => {
  const result = await productsModel.findAll();
  return { type: null, message: result };
};

module.exports = {
  findAll,
};