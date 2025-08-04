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

  create(wallet: IWallet): Promise<IWallet> {
    return this.trx<IWallet>("Wallets").insert(wallet);
  }
  findByUserId(userId: IUser["id"]): Promise<IWallet | undefined> {
    return this.trx<IWallet>("Wallets").where("user_id", userId).first();
  }
  updateById(wallet: IWallet): Promise<IWallet> {
    return this.trx<IWallet>("Wallets").update(wallet);
  }
}
