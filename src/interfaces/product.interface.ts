import { PaymentMethodOnProduct, Product } from "@prisma/client";

export interface ProductRepository {
    create({name, description, currentPrice, oldPrice, checkoutUrl, userId}: Product, {paymentMethodId}: PaymentMethodOnProduct): Promise<Product>;
    listAllByUserId({userId}: Product): Promise<Product[]>;
}
