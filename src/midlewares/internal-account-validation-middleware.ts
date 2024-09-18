import { NextFunction, Response } from "express";
import { RequestMidleware } from "./authorization-midleware";

export function internalAccountValidationMiddleware(
  req: RequestMidleware,
  res: Response,
  next: NextFunction
) {
  if (
    req.username !== process.env.INTERNAL_USER_NAME ||
    req.password !== process.env.INTERNAL_USER_PASSWORD
  ) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  next();
}
