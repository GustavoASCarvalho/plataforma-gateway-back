import { PaymentMethod } from '@prisma/client'

export interface PaymentMethodRepository {
  list(): Promise<PaymentMethod[]>
}
