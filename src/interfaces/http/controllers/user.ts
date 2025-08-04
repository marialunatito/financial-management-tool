import { Request, Response } from "express";
import { CreateUser } from "../../../application/createUser";

export class UserController {
  constructor(private readonly createUser: CreateUser) {}

  async create(req: Request, res: Response) {
    try {
      // TODO: validate req.body maybe implementing zod
      const { firstName, lastName, email, birthdate, countryId } = req.body;

      const result = await this.createUser.execute({
        firstName,
        lastName,
        email,
        birthdate,
        countryId,
      });

      res.status(201).json({
        message: "User created",
        data: result,
      });
    } catch (error) {
      console.log("error:", error);
      res.status(500).json({ message: error });
    }
  }
}
