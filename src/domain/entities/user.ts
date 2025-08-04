export interface IUser {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  countryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
}

export class User implements IUser {
  readonly id: string;
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  countryId: string;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;

  constructor(user: IUser) {
    this.id = user.id;
    this.firstName = user.firstName;
    this.lastName = user.lastName;
    this.email = user.email;
    this.birthdate = user.birthdate;
    this.countryId = user.countryId;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
    this.deletedAt = user.deletedAt;
  }

  getFullName() {
    return `${this.firstName} ${this.lastName}`;
  }
}
