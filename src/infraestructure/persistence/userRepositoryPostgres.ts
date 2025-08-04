import type { Knex } from "knex";
import { Database } from "../database/db";

import { IUserRepository } from "../../application/ports/userRepository";
import { User } from "../../domain/entities/user";

export class UserRepositoryPostgres implements IUserRepository {
  trx: Knex | Knex.Transaction;

  constructor(trx?: Knex | Knex.Transaction) {
    this.trx = trx ?? Database.instance();
  }

  async create(user: User): Promise<User> {
    //TODO: implement mapper
    const userToDB = {
      id: user.id,
      first_name: user.firstName,
      last_name: user.lastName,
      birthdate: user.birthdate,
      created_at: user.createdAt,
      updated_at: user.updatedAt,
      deleted_at: user.deletedAt,
      email: user.email,
      country_id: user.countryId,
    };

    await this.trx<User>("users").insert(userToDB);
    return user;
  }

  // TODO: pending implement
  findByEmail(email: string): Promise<User | undefined> {
    return this.trx<User>("users").where("email", email).first();
  }
  update(user: User): Promise<User> {
    console.log(user);
    throw new Error("Method update not implemented.");
  }
  delete(id: string): Promise<void> {
    // this will be a soft deleted
    console.log(id);
    throw new Error("Method delete not implemented.");
  }
}
