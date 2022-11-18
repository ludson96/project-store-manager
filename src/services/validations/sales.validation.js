const validateProductId = (sale) => {
  let errorMessage;
    sale.map(({ productId }) => {
      if (productId > 99) errorMessage = { type: 'DRIVER_NOT_FOUND', message: 'Product not found' };
      return false;
    });
  if (errorMessage) return errorMessage;
  return false;
};

module.exports = {
  validateProductId,
  };