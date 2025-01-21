import { User } from '@prisma/client';
import { prisma } from '../database/prisma-client';
import { UserRepository, UserRepositoryCreate, UserRepositoryFindByEmail } from '../interfaces/user.interface';

class UserRepositoryPrisma implements UserRepository {
  async create(data: UserRepositoryCreate): Promise<User> {
    const result = await prisma.user.create({
      data: data,
    });
    return result;
  }
  async findByEmail(data: UserRepositoryFindByEmail): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: data,
    });

    return result || null;
  }
}

export { UserRepositoryPrisma };

