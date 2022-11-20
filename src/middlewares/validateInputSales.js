const validateSales = (req, res, next) => {
  const { body } = req;

  let errorMessage;
  body.map(({ productId, quantity }) => {
    if (!productId) errorMessage = res.status(400).json({ message: '"productId" is required' });

    if (!quantity) errorMessage = res.status(400).json({ message: '"quantity" is required' });

    return false;
  });
  if (errorMessage) return errorMessage;
  return next();
};

const validateQuantity = (req, res, next) => {
  const { body } = req;

  let errorMessage;
  body.map(({ quantity }) => {
    if (quantity <= 0) {
      errorMessage = res.status(422)
        .json({ message: '"quantity" must be greater than or equal to 1' });
    }

    return false;
  });

  if (errorMessage) return errorMessage;
  return next();
};

module.exports = {
  validateSales,
  validateQuantity,
};

// const validateSales = (req, res, next) => {
//   const { body } = req;

//   if (!body.every((sale) => 'productId' in sale)) {
//     return res.status(400).json({ message: '"productId" is required' });
//   }

//   if (!body.every((sale) => 'quantity' in sale)) {
//     return res.status(400).json({ message: '"quantity" is required' });
//   }

//   next();
// };

// const validateQuantity = (req, res, next) => {
//   const { body } = req;

//   if (body.some(({ quantity }) => quantity <= 0)) {
//     return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
//   }

//   next();
// };