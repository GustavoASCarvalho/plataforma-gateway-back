import { PixKey } from '@prisma/client'
import { prisma } from '../database/prisma-client'
import { PixKeyRepository, PixKeyRepositoryCreate } from '../interfaces/pix-key.interface'

class PixKeyRepositoryPrisma implements PixKeyRepository {
  async create(data: PixKeyRepositoryCreate): Promise<PixKey> {
    const result = await prisma.paymentConfiguration.upsert({
      where: {
        userId: data.userId
      },
      update: {
        PixKey: {
          create: {
            key: data.key
          }
        }
      },
      create: {
        userId: data.userId,
        PixKey: {
          create: {
            key: data.key
          }
        }
      },
      include: {
        PixKey: true
      }
    })

    return result.PixKey!
  }

  async delete(id: string): Promise<PixKey> {
    const result = await prisma.pixKey.update({
      where: {
        id: id
      },
      data: {
        deletedAt: new Date()
      }
    })

    return result
  }
}

export { PixKeyRepositoryPrisma }
