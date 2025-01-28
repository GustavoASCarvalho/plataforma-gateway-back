import { Product } from "@prisma/client";

export interface ProductRepositoryCreate {
    name: string
    description: string
    currentPrice: number
    oldPrice?: number
    checkoutUrl: string
    userId: string
    paymentMethods: Array<{
        id: string
    }>
}


export interface ProductRepository {
    create(data: ProductRepositoryCreate): Promise<Product>;
    listAllByUserId(userId: string, skip: number, take: number): Promise<Product[]>;
    get(id: string): Promise<Product | null>;
    delete(id: string): Promise<Product>;
}
