const { salesModel } = require('../../models');

const MAP = async (productId) => {
  const allSales = await salesModel.getAllSales();
  const teste = allSales.every((sale) => {
    console.log(sale.productId);
   return sale.productId === productId;
  });
  console.log('Eu sou o array do every: ', teste);
};

const functionAllSales = async () => {
  if (await MAP()) {
    return true; 
  }
  return false;
};

const validateProductId = (sales) => {
  let errorMessage;
  
  sales.map(async ({ productId }) => {
    console.log('Eu sou productId do validation: ', productId);
    if (await functionAllSales()) {
        errorMessage = { type: 'DRIVER_NOT_FOUND', message: 'Product not found' };
      }
      return false;
    });
  if (errorMessage) return errorMessage;
  return false;
};

module.exports = {
  validateProductId,
};
  
//   if (!body.every((sale) => 'productId' in sale)) {
//     return res.status(400).json({ message: '"productId" is required' });
//   }