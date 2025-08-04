import type { IUser } from "../../domain/entities/user";
import type { IWallet } from "../../domain/entities/wallet";

export interface IWalletRepository {
  create(wallet: IWallet): Promise<IWallet>;
  findByUserId(userId: IUser["id"]): Promise<IWallet>;
  updateById(wallet: IWallet): Promise<IWallet>;
}
