import { Prisma } from '@prisma/client';
import { prisma } from '../config/prisma';
import { NotFoundError } from '../errors/AppError';
import { SaleItemInput } from '../middlewares/validateSale';

export interface SaleItemOutput {
  productId: number;
  quantity: number;
}

export interface SaleDetailOutput {
  date: Date;
  productId: number;
  quantity: number;
}

export interface SaleSummaryOutput {
  saleId: number;
  date: Date;
  productId: number;
  quantity: number;
}

export interface CreatedSaleOutput {
  id: number;
  itemsSold: SaleItemOutput[];
}

export interface UpdatedSaleOutput {
  saleId: number;
  itemsUpdated: SaleItemOutput[];
}

export class SalesService {
  private async validateExistingProducts(items: SaleItemInput[]): Promise<void> {
    const productIds = items.map((item) => item.productId);
    const existingProducts = await prisma.product.findMany({
      where: {
        id: { in: productIds },
      },
      select: { id: true },
    });

    const existingIds = new Set(existingProducts.map((p: { id: number }) => p.id));
    for (const id of productIds) {
      if (!existingIds.has(id)) {
        throw new NotFoundError('Product not found');
      }
    }
  }

  async insert(items: SaleItemInput[]): Promise<CreatedSaleOutput> {
    await this.validateExistingProducts(items);

    // Executa em transação interativa para garantir integridade atômica (ACID)
    const result = await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      const newSale = await tx.sale.create({
        data: {
          products: {
            create: items.map((item) => ({
              productId: item.productId,
              quantity: item.quantity,
            })),
          },
        },
        include: {
          products: {
            select: {
              productId: true,
              quantity: true,
            },
          },
        },
      });

      return {
        id: newSale.id,
        itemsSold: newSale.products,
      };
    });

    return result;
  }

  async findAll(): Promise<SaleSummaryOutput[]> {
    const saleProducts = await prisma.saleProduct.findMany({
      include: {
        sale: {
          select: { date: true },
        },
      },
      orderBy: [{ saleId: 'asc' }, { productId: 'asc' }],
    });

    return saleProducts.map((sp: { saleId: number; sale: { date: Date }; productId: number; quantity: number }) => ({
      saleId: sp.saleId,
      date: sp.sale.date,
      productId: sp.productId,
      quantity: sp.quantity,
    }));
  }

  async findById(id: number): Promise<SaleDetailOutput[]> {
    const sale = await prisma.sale.findUnique({
      where: { id },
      include: {
        products: {
          orderBy: { productId: 'asc' },
        },
      },
    });

    if (!sale || sale.products.length === 0) {
      throw new NotFoundError('Sale not found');
    }

    return sale.products.map((p: { productId: number; quantity: number }) => ({
      date: sale.date,
      productId: p.productId,
      quantity: p.quantity,
    }));
  }

  async updateById(id: number, items: SaleItemInput[]): Promise<UpdatedSaleOutput> {
    const saleExists = await prisma.sale.findUnique({ where: { id } });
    if (!saleExists) {
      throw new NotFoundError('Sale not found');
    }

    await this.validateExistingProducts(items);

    await prisma.$transaction(async (tx: Prisma.TransactionClient) => {
      await tx.saleProduct.deleteMany({
        where: { saleId: id },
      });

      await tx.saleProduct.createMany({
        data: items.map((item) => ({
          saleId: id,
          productId: item.productId,
          quantity: item.quantity,
        })),
      });
    });

    const updatedItems = await prisma.saleProduct.findMany({
      where: { saleId: id },
      select: {
        productId: true,
        quantity: true,
      },
      orderBy: { productId: 'asc' },
    });

    return {
      saleId: id,
      itemsUpdated: updatedItems,
    };
  }

  async deleteById(id: number): Promise<void> {
    const saleExists = await prisma.sale.findUnique({ where: { id } });
    if (!saleExists) {
      throw new NotFoundError('Sale not found');
    }

    await prisma.sale.delete({
      where: { id },
    });
  }
}

export const salesService = new SalesService();
