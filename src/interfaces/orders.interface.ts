import { Orders } from "@prisma/client";

export interface OrdersRepository {
    create({customerId, orderStatus, userId, paymentMethodId}: Orders): Promise<Orders>;
    updateOrderStatus({orderStatus, id}: Orders): Promise<Orders>;
}
