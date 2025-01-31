import { Product } from '@prisma/client';
import { ProductRepository } from '../interfaces/product.interface';
import { ProductRepositoryPrisma } from '../repositories/product.repository';

export interface ProductCreate {
    name: string;
    description: string;
    currentPrice: number;
    oldPrice?: number;
    userId: string;
    paymentMethods: Array<{
        id: string
    }>;
}

export class ProductUseCase {
    private productRepository: ProductRepository;
    constructor() {
        this.productRepository = new ProductRepositoryPrisma();
    }

    async create({ name, description, currentPrice, oldPrice, userId, paymentMethods }: ProductCreate): Promise<Product> {
        const product = await this.productRepository.create({
            name,
            description,
            currentPrice,
            oldPrice,
            userId,
            paymentMethods,
            checkoutUrl: '/c/' + Math.random().toString(36).substring(7),
        });

        return product
    }

    async get(id: string): Promise<Product | null> {
        return this.productRepository.get(id);
    }

    async delete(id: string): Promise<Product> {
        return this.productRepository.delete(id);
    }

    async listAllByUserId(userId: string, page: number, take: number): Promise<Product[]> {
        const skip = page * take;
        return this.productRepository.listAllByUserId(userId, skip, take);
    }
}
