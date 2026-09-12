import { Router } from 'express';
import { productsController } from '../controllers/products.controller';
import { validateProductName } from '../middlewares/validateProduct';

const productsRouter = Router();

productsRouter.get('/search', (req, res) => productsController.search(req, res));
productsRouter.get('/', (req, res) => productsController.findAll(req, res));
productsRouter.get('/:id', (req, res) => productsController.findById(req, res));
productsRouter.post('/', validateProductName, (req, res) => productsController.insert(req, res));
productsRouter.put('/:id', validateProductName, (req, res) => productsController.updateById(req, res));
productsRouter.delete('/:id', (req, res) => productsController.deleteById(req, res));

export { productsRouter };
