import { ICategory } from "./category";
import { IWallet } from "./wallet";

export enum MovementEnum {
  credit = "credit",
  debit = "debit",
}

export interface IMovement {
  id: string;
  categoryId: ICategory["id"];
  walletId: IWallet["id"];
  type: MovementEnum;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Movement implements IMovement {
  id: string;
  categoryId: ICategory["id"];
  walletId: IWallet["id"];
  type: MovementEnum;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(movement: IMovement) {
    this.id = movement.id;
    this.categoryId = movement.categoryId;
    this.walletId = movement.walletId;
    this.type = movement.type;
    this.description = movement.description;
    this.createdAt = movement.createdAt;
    this.updatedAt = movement.updatedAt;
    this.deletedAt = movement.deletedAt;
  }
}
