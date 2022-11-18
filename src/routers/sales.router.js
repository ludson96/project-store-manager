const express = require('express');
const { salesController } = require('../controllers');
const validateInputSale = require('../middlewares/validateInputSales');

const router = express.Router();

router.post('/', validateInputSale, salesController.insert);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getByIdSales);

router.delete('/:id', salesController.deleteByIdSales);

module.exports = router;
