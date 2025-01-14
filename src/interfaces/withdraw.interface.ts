import { Withdraw } from "@prisma/client";

export interface WithdrawRepository {
    create({userId, value, status}: Withdraw): Promise<Withdraw>;
    updateWithdrawStatus({id, status}: Withdraw): Promise<Withdraw[]>;
}
