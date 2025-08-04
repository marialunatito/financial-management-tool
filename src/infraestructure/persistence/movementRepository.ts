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
    await this.trx<IMovement>("movements").insert(movement);
    return movement;
  }
}
