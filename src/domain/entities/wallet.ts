export interface IWallet {
  id: string;
  userId: string;
  amount: number;
  status: boolean;
  monthlyRecurrence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Wallet implements IWallet {
  id: string;
  userId: string;
  amount: number;
  status: boolean;
  monthlyRecurrence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(wallet: IWallet) {
    this.id = wallet.id;
    this.userId = wallet.userId;
    this.amount = wallet.amount;
    this.status = wallet.status;
    this.monthlyRecurrence = wallet.monthlyRecurrence;
    this.createdAt = wallet.createdAt;
    this.updatedAt = wallet.updatedAt;
    this.deletedAt = wallet.deletedAt;
  }
}
