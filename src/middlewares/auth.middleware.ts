import dayjs from 'dayjs';
import { FastifyReply, FastifyRequest } from 'fastify';
import { ApiError } from '../types/api-error.types';
import { JWE } from '../utils/jwe.utils';

export async function authMiddleware(req: FastifyRequest, reply: FastifyReply) {
  const authorization = req.headers['authorization'];

  if (!authorization) {
    throw new ApiError('Unauthorized', 401);
  }

  const token = authorization.split("Bearer ")[1];

  try {
    const { id, iat, exp } = await new JWE().decrypt(token);
    if (
      !id ||
      !iat ||
      !exp ||
      exp < dayjs().unix() ||
      iat > dayjs().unix() ||
      typeof id !== "string"
    ) {
      throw new ApiError(`Não autorizado`, 401);
    }
    reply.userId = id;
  } catch (error) {
    throw new ApiError(`Não autorizado`, 401);
  }
}
