import type { Knex } from "knex";
import { ICategoryRepository } from "src/application/ports/categoryRepository";
import { ICategory } from "src/domain/entities/category";
import { v4 } from "uuid";
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
      description: "",
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
