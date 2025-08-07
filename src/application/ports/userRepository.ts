import { IUser } from "../../domain/entities/user";

export interface IUserRepository {
  create(user: IUser): Promise<IUser>;
  findByEmail(email: string): Promise<IUser | undefined>;
  update(user: IUser): Promise<IUser>;
  delete(id: string): Promise<void>;
  login(user: IUser): Promise<{ accessToken: string; refreshToken: string }>;
}
