import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  console.log('Seeding database...');

  // Limpa registros anteriores para garantir idempotência
  await prisma.saleProduct.deleteMany();
  await prisma.sale.deleteMany();
  await prisma.product.deleteMany();

  // Insere produtos iniciais
  const p1 = await prisma.product.create({
    data: { id: 1, name: 'Martelo de Thor' },
  });
  const p2 = await prisma.product.create({
    data: { id: 2, name: 'Traje de encolhimento' },
  });
  const p3 = await prisma.product.create({
    data: { id: 3, name: 'Escudo do Capitão América' },
  });

  // Insere vendas iniciais
  const s1 = await prisma.sale.create({
    data: {
      id: 1,
      date: new Date(),
      products: {
        create: [
          { productId: p1.id, quantity: 5 },
          { productId: p2.id, quantity: 10 },
        ],
      },
    },
  });

  const s2 = await prisma.sale.create({
    data: {
      id: 2,
      date: new Date(),
      products: {
        create: [{ productId: p3.id, quantity: 15 }],
      },
    },
  });

  console.log('Seed completed successfully:');
  console.log(`- Created products: 3`);
  console.log(`- Created sales: 2 (IDs: ${s1.id}, ${s2.id})`);
}

main()
  .catch((e) => {
    console.error('Error during seed:', e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
