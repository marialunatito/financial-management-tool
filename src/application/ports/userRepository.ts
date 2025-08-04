import { User } from "../../domain/entities/user";

export interface IUserRepository {
  create(user: User): Promise<User>;
  findByEmail(email: string): Promise<User | undefined>;
  update(user: User): Promise<User>;
  delete(id: string): Promise<void>;
}
