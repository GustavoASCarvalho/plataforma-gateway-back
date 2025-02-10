import { PaymentMethod } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import { PaymentMethodRepository } from '../interfaces/payment-method.interface'

export class PaymentMethodRepositoryPrisma implements PaymentMethodRepository {
  async list(): Promise<PaymentMethod[]> {
    const result = await prisma.paymentMethod.findMany({
      where: {
        deletedAt: null
      }
    })
    return result
  }
}
