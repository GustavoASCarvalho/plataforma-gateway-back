import { PixKey } from "@prisma/client";

export interface PixKeyRepository {
    create({key, userId}: PixKey): Promise<PixKey>;
    listAllByUserId({userId}: PixKey): Promise<PixKey[]>;
}
