import { Request, Response } from "express";
import { Login } from "./../../../application/login";

export class LoginController {
  constructor(private readonly _login: Login) {}

  async login(req: Request, res: Response) {
    try {
      if (!req.body && !req.body.email) {
        res.status(401).json({ message: `Error in body` });
      }
      const result = await this._login.execute(req.body);
      res.status(200).json({ result });
    } catch (error) {
      console.log("error", error);
      res.status(500).json({ message: (error as Error).message });
    }
  }
}
