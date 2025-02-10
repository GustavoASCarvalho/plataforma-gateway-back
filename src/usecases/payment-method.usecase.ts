import { PaymentMethod } from '@prisma/client'
import { PaymentMethodRepository } from '../interfaces/payment-method.interface'
import { PaymentMethodRepositoryPrisma } from '../repositories/payment-method.repository'

export class PaymentMethodUseCase {
  private paymentMethodRepository: PaymentMethodRepository
  constructor() {
    this.paymentMethodRepository = new PaymentMethodRepositoryPrisma()
  }
  async list(): Promise<PaymentMethod[]> {
    const paymentMethods = await this.paymentMethodRepository.list()

    return paymentMethods
  }
}
