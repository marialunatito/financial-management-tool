import { v4 as uuid } from "uuid";
import { User } from "../domain/entities/user";
import { IUserRepository } from "./ports/userRepository";

interface CreateUserInput {
  firstName: string;
  lastName: string;
  email: string;
  birthdate: Date;
  countryId: string;
}

export class CreateUser {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(input: CreateUserInput): Promise<User> {
    const existingUser = await this.userRepository.findByEmail(input.email);

    if (existingUser) {
      throw new Error("User already exists");
    }

    const now = new Date();
    const user = new User({
      id: uuid(),
      createdAt: now,
      updatedAt: now,
      deletedAt: null,
      ...input,
    });

    console.log("entro aca!!");

    await this.userRepository.create(user);
    return user;
  }
}
