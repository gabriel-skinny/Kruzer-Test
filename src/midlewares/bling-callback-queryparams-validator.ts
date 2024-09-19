import { NextFunction, Response } from "express";
import { RequestMidleware } from "./authorization-midleware";

export function blingCallbackQueryParamsValidatorMidleware(
  req: RequestMidleware,
  res: Response,
  next: NextFunction
) {
  const { code, state } = req.query;

  if (!code || !state) return res.status(401).json({ message: "Unauthorized" });

  next();
}
