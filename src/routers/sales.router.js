const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

// router.post('/', salesController);

router.get('/', salesController.getAllSales);

router.get('/:id', salesController.getByIdSales);

module.exports = router;
