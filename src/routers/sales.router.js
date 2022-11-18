const express = require('express');
const { salesController } = require('../controllers');
const { validateQuantity, validateSales } = require('../middlewares/validateInputSales');

const router = express.Router();

router.post('/', validateQuantity, validateSales, salesController.insert);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getByIdSales);

router.delete('/:id', salesController.deleteByIdSales);

module.exports = router;
