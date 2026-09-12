import { Request, Response, NextFunction } from 'express';

export const validateProductName = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  const { name } = req.body;

  if (name === undefined || name === null || name === '') {
    res.status(400).json({ message: '"name" is required' });
    return;
  }

  if (typeof name !== 'string' || name.trim().length < 5) {
    res.status(422).json({ message: '"name" length must be at least 5 characters long' });
    return;
  }

  next();
};
