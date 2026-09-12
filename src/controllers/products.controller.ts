import { Request, Response } from 'express';
import { productsService } from '../services/products.service';

export class ProductsController {
  async findAll(_req: Request, res: Response): Promise<void> {
    const products = await productsService.findAll();
    res.status(200).json(products);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const product = await productsService.findById(Number(id));
    res.status(200).json(product);
  }

  async insert(req: Request, res: Response): Promise<void> {
    const { name } = req.body;
    const product = await productsService.insert(name);
    res.status(201).json(product);
  }

  async updateById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const { name } = req.body;
    const updated = await productsService.updateById(Number(id), name);
    res.status(200).json(updated);
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await productsService.deleteById(Number(id));
    res.status(204).send();
  }

  async search(req: Request, res: Response): Promise<void> {
    const query = (req.query.q as string) || '';
    const products = await productsService.search(query);
    res.status(200).json(products);
  }
}

export const productsController = new ProductsController();
