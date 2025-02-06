import { Product } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import { ProductRepository, ProductRepositoryCreate } from '../interfaces/product.interface'

export class ProductRepositoryPrisma implements ProductRepository {
  async create(data: ProductRepositoryCreate): Promise<Product> {
    const product = await prisma.product.create({
      data: {
        name: data.name,
        description: data.description,
        currentPrice: data.currentPrice,
        oldPrice: data.oldPrice,
        slug: data.slug,
        user: {
          connect: {
            id: data.userId
          }
        },
        paymentMethodOnProductId: {
          create: data.paymentMethods.map((paymentMethod) => ({
            paymentMethodId: paymentMethod.id
          }))
        }
      }
    })

    return product
  }
  async listAllByUserId(userId: string, skip: number, take: number): Promise<Product[]> {
    const products = await prisma.product.findMany({
      where: {
        userId,
        deletedAt: null
      },
      skip: skip,
      take: take
    })

    return products
  }
  async get(id: string): Promise<Product | null> {
    const product = await prisma.product.findUnique({
      where: {
        id,
        deletedAt: null
      }
    })

    return product
  }
  async delete(id: string): Promise<Product> {
    const product = await prisma.product.update({
      where: {
        id
      },
      data: {
        deletedAt: new Date()
      }
    })

    return product
  }
}
