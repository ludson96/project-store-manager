process.env.DATABASE_URL = 'file:./prisma/test.db';

import { execSync } from 'child_process';
import { prisma } from '../src/config/prisma';

beforeAll(async () => {
  // Sincroniza schema do SQLite para o ambiente de testes
  execSync('npx prisma db push --schema=./prisma/schema.sqlite.prisma --skip-generate', {
    env: { ...process.env, DATABASE_URL: 'file:./prisma/test.db' },
    stdio: 'ignore',
  });

  // Limpa e popula dados no banco de testes
  await prisma.saleProduct.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();

  await prisma.product.createMany({
    data: [
      { id: 1, name: 'Martelo de Thor' },
      { id: 2, name: 'Traje de encolhimento' },
      { id: 3, name: 'Escudo do Capitão América' },
    ],
  });

  await prisma.sale.create({
    data: {
      id: 1,
      date: new Date(),
      products: {
        create: [
          { productId: 1, quantity: 5 },
          { productId: 2, quantity: 10 },
        ],
      },
    },
  });
});

afterAll(async () => {
  await prisma.$disconnect();
});
