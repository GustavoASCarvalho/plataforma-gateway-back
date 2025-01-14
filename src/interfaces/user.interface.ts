import { User } from "@prisma/client";

export interface UserRepository {
    create({name, cpf, cnpj, email, password, balance, role}: User): Promise<User>;
    findByEmail({email}: User): Promise<User | null>;
}
