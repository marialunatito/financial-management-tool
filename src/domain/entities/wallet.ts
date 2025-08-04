export interface IWallet {
  id: string;
  userId: string;
  total: number;
  status: boolean;
  monthlyRecurrence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Wallet implements IWallet {
  id: string;
  userId: string;
  total: number;
  status: boolean;
  monthlyRecurrence: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(wallet: IWallet) {
    this.id = wallet.id;
    this.userId = wallet.userId;
    this.total = wallet.total;
    this.status = wallet.status;
    this.monthlyRecurrence = wallet.monthlyRecurrence;
    this.createdAt = wallet.createdAt;
    this.updatedAt = wallet.updatedAt;
    this.deletedAt = wallet.deletedAt;
  }

  public debit(amount: number): void {
    if (amount <= 0) throw new Error(`Invalid amount: ${amount}`);

    if (this.total < amount) {
      throw new Error(`Insufficient funds - currency funds: ${this.total}`);
    }

    this.total -= amount;
  }

  public credit(amount: number): void {
    if (amount <= 0) throw new Error(`Invalid amount: ${amount}`);

    this.total += amount;
  }

  public getTotal(): number {
    return this.total;
  }
}
