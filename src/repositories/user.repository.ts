import { User } from '@prisma/client';
import { prisma } from '../database/prisma-client';
import { UserRepository } from '../interfaces/user.interface';

class UserRepositoryPrisma implements UserRepository {
  async create({name, cpf, cnpj, email, password, balance, role}: User): Promise<User> {
    const result = await prisma.user.create({
      data: {
        name,
        cpf,
        cnpj,
        email,
        password,
        balance,
        role,
      },
    });
    return result;
  }
  async findByEmail({email}: User): Promise<User | null> {
    const result = await prisma.user.findFirst({
      where: {
        email,
      },
    });

    return result || null;
  }
}

export { UserRepositoryPrisma };

