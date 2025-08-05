import { Knex } from "knex";
import { IMovementRepository } from "../../application/ports/movementRepository";
import { IMovement } from "../../domain/entities/movement";
import { Database } from "../database/db";

export class MovementRepositoryPostgres implements IMovementRepository {
  trx: Knex | Knex.Transaction;

  constructor(trx?: Knex | Knex.Transaction) {
    this.trx = trx ?? Database.instance();
  }

  async create(movement: IMovement): Promise<IMovement> {
    // TODO: mapperTODB
    const input = {
      id: movement.id,
      category_id: movement.categoryId,
      wallet_id: movement.walletId,
      amount: movement.amount,
      type: movement.type,
      description: movement.description,
      created_at: movement.createdAt,
      updated_at: movement.updatedAt,
      deleted_at: movement.deletedAt,
    };
    await this.trx<IMovement>("movements").insert(input);
    return movement;
  }
}
