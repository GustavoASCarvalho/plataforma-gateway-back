import { Product } from "@prisma/client";
import { prisma } from "../database/prisma-client";
import { ProductRepository, ProductRepositoryCreate } from "../interfaces/product.interface";

export class ProductRepositoryPrisma implements ProductRepository {
    async create(data: ProductRepositoryCreate): Promise<Product> {
        const product = await prisma.product.create({
            data: {
                name: data.name,
                description: data.description,
                currentPrice: data.currentPrice,
                oldPrice: data.oldPrice,
                checkoutUrl: data.checkoutUrl,
                user: {
                    connect: {
                        id: data.userId
                    }
                },
                paymentMethodOnProductId: {
                    create: data.paymentMethods.map(paymentMethod => ({
                        paymentMethodId: paymentMethod.id
                    }))
                }
            }
        })

        return product;
    }
    async listAllByUserId(userId: string): Promise<Product[]> {
        const products = await prisma.product.findMany({
            where: {
                userId
            }
        })

        return products;
    }
}