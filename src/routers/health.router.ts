import { Router, Request, Response } from 'express';
import { prisma } from '../config/prisma';

const healthRouter = Router();

healthRouter.get('/', async (_req: Request, res: Response) => {
  try {
    // Validação de conectividade real com o banco
    await prisma.$queryRaw`SELECT 1`;

    res.status(200).json({
      status: 'healthy',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      database: 'connected',
      environment: process.env.NODE_ENV || 'development',
    });
  } catch (error) {
    res.status(503).json({
      status: 'unhealthy',
      timestamp: new Date().toISOString(),
      database: 'disconnected',
      error: (error as Error).message,
    });
  }
});

export { healthRouter };
