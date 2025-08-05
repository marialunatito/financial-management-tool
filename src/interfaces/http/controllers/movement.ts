import { Request, Response } from "express";
import { RegisterMovement } from "../../../application/registerMovement";

export class MovementController {
  constructor(private readonly registerMovement: RegisterMovement) {}

  async register(req: Request, res: Response) {
    try {
      const { amount, type, description, category, userId } = req.body;
      const result = await this.registerMovement.execute({
        amount,
        type,
        description,
        category,
        userId,
      });

      res.status(201).json({
        message: "Movement registered with success",
        data: result,
      });
    } catch (error) {
      res.status(500).json({ message: error });
    }
  }
}
