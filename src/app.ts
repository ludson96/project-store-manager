import express from 'express';
import 'express-async-errors';
import cors from 'cors';
import swaggerUi from 'swagger-ui-express';
import { productsRouter, salesRouter, healthRouter } from './routers';
import { errorHandler } from './middlewares/errorHandler';
import { swaggerSpec } from './docs/swagger';

const app = express();

app.use(cors());
app.use(express.json());

// Documentação Interativa Swagger / OpenAPI
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Rota de Healthcheck do Sistema
app.use('/health', healthRouter);

// Redirecionamento amigável da rota raiz para o Swagger UI (/api-docs)
app.get('/', (req, res) => {
  if (req.accepts('html')) {
    res.redirect('/api-docs');
    return;
  }
  res.status(200).json({
    message: 'Store Manager API is running!',
    documentation: '/api-docs',
    health: '/health',
  });
});

// Rotas de Domínio
app.use('/products', productsRouter);
app.use('/sales', salesRouter);

// Middleware Global de Tratamento de Erros
app.use(errorHandler);

export default app;
