import bcrypt from 'bcrypt';
import dayjs from 'dayjs';
import { UserRepository } from '../interfaces/user.interface';
import { UserRepositoryPrisma } from '../repositories/user.repository';
import { ApiError } from '../types/api-error.types';
import { JWE } from '../utils/jwe.utils';

export interface UserCreate {
  name: string;
  email: string;
  password: string;
  cpf?: string;
  cnpj?: string;
}

export interface UserAuthenticate {
  email: string;
  password: string;
}

export class UserUseCase {
  private userRepository: UserRepository;
  constructor() {
    this.userRepository = new UserRepositoryPrisma();
  }

  async create({ name, email, cpf, cnpj, password }: UserCreate): Promise<string> {
    const verifyIfUserExists = await this.userRepository.findByEmail({ email });
    if (verifyIfUserExists) {
      throw new ApiError('User already exists', 400);
    }
    const user = await this.userRepository.create({
      email,
      name,
      cpf,
      cnpj,
      password: bcrypt.hashSync(password, 10),
    });

    const token = await new JWE().encrypt({
      id: user.id,
      iat: dayjs().unix(),
      exp: dayjs().add(8, 'hours').unix(),
    });

    return token;
  }

  async authenticate({ email, password }: UserAuthenticate): Promise<string> {
    const user = await this.userRepository.findByEmail({ email });

    if (!user || !user.password || !(await bcrypt.compare(password, user.password))) {
      throw new ApiError('Unauthorize', 401);
    }

    const token = await new JWE().encrypt({
      id: user.id,
      iat: dayjs().unix(),
      exp: dayjs().add(8, 'hours').unix(),
    });

    return token;
  }
}
