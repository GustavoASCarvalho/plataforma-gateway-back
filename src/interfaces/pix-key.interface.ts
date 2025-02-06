import { PixKey } from '@prisma/client'

export interface PixKeyRepositoryCreate {
  userId: string
  key: string
}

export interface PixKeyRepository {
  create(data: PixKeyRepositoryCreate): Promise<PixKey>
  delete(id: string): Promise<PixKey>
}
