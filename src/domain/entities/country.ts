export interface ICountry {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class Country implements ICountry {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(country: ICountry) {
    this.id = country.id;
    this.name = country.name;
    this.createdAt = country.createdAt;
    this.updatedAt = country.updatedAt;
    this.deletedAt = country.deletedAt;
  }
}
