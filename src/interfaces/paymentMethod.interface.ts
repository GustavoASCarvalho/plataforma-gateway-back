import { PaymentMethod } from "@prisma/client";

export interface PaymentRepository {
    listAllPayments(): Promise<PaymentMethod[]>;
}
