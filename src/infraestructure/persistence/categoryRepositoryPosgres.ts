import type { Knex } from "knex";
import { v4 } from "uuid";
import { ICategoryRepository } from "../../application/ports/categoryRepository";
import { ICategory } from "../../domain/entities/category";
import { Database } from "../database/db";

export class CategoryRepositoryPostgres implements ICategoryRepository {
  trx: Knex | Knex.Transaction;

  constructor(trx?: Knex | Knex.Transaction) {
    this.trx = trx ?? Database.instance();
  }
  async create(name: ICategory["name"]): Promise<ICategory> {
    const now = new Date();
    const category = {
      id: v4(),
      name,
      description: "lorem ipsum", // TODO improving this
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
    };
    await this.trx<ICategory>("categories").insert(category);

    return category;
  }
  findByName(name: ICategory["name"]): Promise<ICategory | undefined> {
    return this.trx<ICategory>("categories").where(name).first();
  }
}
