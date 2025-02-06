import { PixKey } from '@prisma/client'
import { PixKeyRepository } from '../interfaces/pix-key.interface'
import { PixKeyRepositoryPrisma } from '../repositories/pixKey.repository'
import { ApiError } from '../types/api-error.types'

export interface PixKeyCreate {
  key: string
  userId: string
}

export class PixKeyUseCase {
  private pixKeyRepository: PixKeyRepository
  constructor() {
    this.pixKeyRepository = new PixKeyRepositoryPrisma()
  }

  async create({ key, userId }: PixKeyCreate): Promise<PixKey> {
    const pixKey = await this.pixKeyRepository.create({ key, userId })

    return pixKey
  }

  async delete(id: string): Promise<PixKey> {
    const pixKey = await this.pixKeyRepository.delete(id)

    if (!pixKey) {
      throw new ApiError('PixKey not found', 404)
    }

    return pixKey
  }

  async listByUserId(userId: string): Promise<PixKey[]> {
    const pixKeys = await this.pixKeyRepository.listByUserId(userId)

    return pixKeys
  }
}
