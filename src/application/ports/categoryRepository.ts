import { ICategory } from "./../../domain/entities/category";

export interface ICategoryRepository {
  create(name: ICategory["name"]): Promise<ICategory>;
  findByName(name: ICategory["name"]): Promise<ICategory | undefined>;
}
