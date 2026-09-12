import { Request, Response } from 'express';
import { salesService } from '../services/sales.service';
import { SaleItemInput } from '../middlewares/validateSale';

export class SalesController {
  async insert(req: Request, res: Response): Promise<void> {
    const items = req.body as SaleItemInput[];
    const result = await salesService.insert(items);
    res.status(201).json(result);
  }

  async findAll(_req: Request, res: Response): Promise<void> {
    const sales = await salesService.findAll();
    res.status(200).json(sales);
  }

  async findById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const sale = await salesService.findById(Number(id));
    res.status(200).json(sale);
  }

  async updateById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    const items = req.body as SaleItemInput[];
    const updated = await salesService.updateById(Number(id), items);
    res.status(200).json(updated);
  }

  async deleteById(req: Request, res: Response): Promise<void> {
    const { id } = req.params;
    await salesService.deleteById(Number(id));
    res.status(204).send();
  }
}

export const salesController = new SalesController();
