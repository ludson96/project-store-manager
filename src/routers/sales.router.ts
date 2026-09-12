import { Router } from 'express';
import { salesController } from '../controllers/sales.controller';
import { validateSaleItems } from '../middlewares/validateSale';

const salesRouter = Router();

salesRouter.get('/', (req, res) => salesController.findAll(req, res));
salesRouter.get('/:id', (req, res) => salesController.findById(req, res));
salesRouter.post('/', validateSaleItems, (req, res) => salesController.insert(req, res));
salesRouter.put('/:id', validateSaleItems, (req, res) => salesController.updateById(req, res));
salesRouter.delete('/:id', (req, res) => salesController.deleteById(req, res));

export { salesRouter };
