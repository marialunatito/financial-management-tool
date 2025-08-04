export interface ICategory {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Category implements ICategory {
  id: string;
  name: string;
  description: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(category: ICategory) {
    this.id = category.id;
    this.name = category.name;
    this.description = category.description;
    this.createdAt = category.createdAt;
    this.updatedAt = category.updatedAt;
    this.deletedAt = category.deletedAt;
  }
}
