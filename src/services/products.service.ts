import { prisma } from '../config/prisma';
import { NotFoundError } from '../errors/AppError';

export interface ProductResponse {
  id: number;
  name: string;
}

export class ProductsService {
  async findAll(): Promise<ProductResponse[]> {
    return prisma.product.findMany({
      orderBy: { id: 'asc' },
    });
  }

  async findById(id: number): Promise<ProductResponse> {
    const product = await prisma.product.findUnique({
      where: { id },
    });

    if (!product) {
      throw new NotFoundError('Product not found');
    }

    return product;
  }

  async insert(name: string): Promise<ProductResponse> {
    return prisma.product.create({
      data: { name },
    });
  }

  async updateById(id: number, name: string): Promise<ProductResponse> {
    await this.findById(id);

    return prisma.product.update({
      where: { id },
      data: { name },
    });
  }

  async deleteById(id: number): Promise<void> {
    await this.findById(id);

    await prisma.product.delete({
      where: { id },
    });
  }

  async search(query: string): Promise<ProductResponse[]> {
    if (!query) {
      return this.findAll();
    }

    return prisma.product.findMany({
      where: {
        name: {
          contains: query,
        },
      },
      orderBy: { id: 'asc' },
    });
  }
}

export const productsService = new ProductsService();
