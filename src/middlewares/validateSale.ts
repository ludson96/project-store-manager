import { Request, Response, NextFunction } from 'express';

export interface SaleItemInput {
  productId: number;
  quantity: number;
}

export const validateSaleItems = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const items = req.body as SaleItemInput[];

  if (!Array.isArray(items) || items.length === 0) {
    res.status(400).json({ message: 'Request body must be a non-empty array of sale items' });
    return;
  }

  for (const item of items) {
    if (item.productId === undefined || item.productId === null) {
      res.status(400).json({ message: '"productId" is required' });
      return;
    }

    if (item.quantity === undefined || item.quantity === null) {
      res.status(400).json({ message: '"quantity" is required' });
      return;
    }

    if (typeof item.quantity !== 'number' || item.quantity <= 0) {
      res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
      return;
    }
  }

  next();
};
