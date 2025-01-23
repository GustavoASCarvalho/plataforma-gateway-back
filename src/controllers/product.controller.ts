import { FastifyReply, FastifyRequest } from "fastify";
import { ApiResponse } from "../types/api-response.types";
import { ProductUseCase } from "../usecases/product.usecase";

export interface CreateProductRequestBody {
    name: string;
    description: string;
    currentPrice: number;
    oldPrice?: number;
    paymentMethods: Array<{
        id: string
    }>;
}

export class ProductController {
    public async create(req: FastifyRequest, res: FastifyReply): Promise<any> {
        const productUseCase = new ProductUseCase();
        const { name, description, currentPrice, oldPrice, paymentMethods } = req.body as CreateProductRequestBody;
        const product = await productUseCase.create({ name, description, currentPrice, oldPrice, paymentMethods, userId: res.userId! });

        return res.code(201).send({
            message: `Product created successfully`,
            statusCode: 201,
            data: product
        } as ApiResponse);
    }
}