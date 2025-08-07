import { IUserRepository } from "./ports/userRepository";

interface LoginInput {
  email: string;
}

export class Login {
  constructor(private readonly userRepository: IUserRepository) {}

  async execute(
    input: LoginInput
  ): Promise<{ accessToken: string; refreshToken: string }> {
    const { email } = input;

    const user = await this.userRepository.findByEmail(email);
    console.log("user:", user);
    if (!user) throw new Error(`User ${email} not found`);

    return this.userRepository.login(user);
  }
}
