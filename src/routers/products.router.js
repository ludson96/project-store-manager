const express = require('express');
const { productsController } = require('../controllers');
const validateProductName = require('../middlewares/validateProductName');

const router = express.Router();

router.get('/search', productsController.search);

router.get('/', productsController.findAll);

router.get('/:id', productsController.findById);

router.post('/', validateProductName, productsController.insert);

router.put('/:id', validateProductName, productsController.updateById);

router.delete('/:id', productsController.deleteById);

module.exports = router;
