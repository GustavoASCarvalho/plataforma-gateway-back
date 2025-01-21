import { User } from "@prisma/client";

export enum UserRepositoryRole {
    USER = "USER",
    ADMIN = "ADMIN"
}

export interface UserRepositoryCreate {
    name: string;
    email: string;
    password: string;
    cpf?: string;
    cnpj?: string;
    balance?: number;
    role?: UserRepositoryRole;
}

export interface UserRepositoryFindByEmail {
    email: string;
}

export interface UserRepository {
    create(data: UserRepositoryCreate): Promise<User>;
    findByEmail(data: UserRepositoryFindByEmail): Promise<User | null>;
}
