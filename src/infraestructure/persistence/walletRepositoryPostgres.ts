import { Knex } from "knex";
import { IWalletRepository } from "../../application/ports/walletRepository";
import { IUser } from "../../domain/entities/user";
import { IWallet } from "../../domain/entities/wallet";
import { Database } from "../database/db";

export class WalletRepositoryPostgres implements IWalletRepository {
  private trx: Knex | Knex.Transaction;

  constructor(trx?: Knex | Knex.Transaction) {
    this.trx = trx ?? Database.instance();
  }

  async create(wallet: IWallet): Promise<IWallet> {
    // TODO: mapper to db
    const input = {
      id: wallet.id,
      user_id: wallet.userId,
      total: wallet.total,
      status: wallet.status,
      monthly_recurrence: wallet.monthlyRecurrence,
      created_at: wallet.createdAt,
      updated_at: wallet.updatedAt,
      deleted_at: wallet.deletedAt,
    };
    await this.trx<IWallet>("wallets").insert(input);
    return wallet;
  }
  async findByUserId(userId: IUser["id"]): Promise<IWallet | undefined> {
    const result = await this.trx("wallets").where("user_id", userId).first();

    if (!result) {
      return;
    }

    // Mapper to Interrface
    return {
      id: result.id,
      userId: result.user_id,
      total: parseFloat(result.total),
      status: result.status,
      monthlyRecurrence: parseInt(result.monthly_recurrence),
      createdAt: result.created_at,
      updatedAt: result.updated_at,
      deletedAt: result.deleted_at,
    };
  }
  async updateById({
    id,
    total,
  }: {
    id: IWallet["id"];
    total: IWallet["total"];
  }): Promise<void> {
    await this.trx<IWallet>("wallets").update("total", total).where("id", id);
  }
}
