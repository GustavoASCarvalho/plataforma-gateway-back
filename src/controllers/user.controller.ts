import { FastifyReply, FastifyRequest } from "fastify";
import { UserUseCase } from "../usecases/user.usecase";

interface CreateUserRequest extends FastifyRequest {
    body: {
        name: string;
        email: string;
        password: string;
        cpf?: string;
        cnpj?: string;
    };
}

export class UserController {
    public async create(req: CreateUserRequest, res: FastifyReply): Promise<any> {
        const userUseCase = new UserUseCase();

        const { name, email, cpf, cnpj, password } = req.body;
        const token = await userUseCase.create({ name, email, cpf, cnpj, password });

        return res.code(201).send({ token });
    }
}