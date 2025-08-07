import { NextFunction, Request as RequestExpress, Response } from "express";
import { validateAccessToken } from "../../../infraestructure/auth";
import { UserClaims } from "./../../../infraestructure/auth/index";

type Request = RequestExpress & {
  user?: UserClaims | undefined;
};

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (!req.headers.authorization) {
    res.status(401).json({ message: "Unauthorized token" });
  } else {
    const { user: userClaims } = await validateAccessToken(
      req.headers.authorization
    );

    if (!userClaims) {
      res.status(403).json({ message: "Invalid token." });
    }

    req.user = userClaims;
    next();
  }
};
