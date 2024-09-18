import { NextFunction, Response } from "express";
import { RequestMidleware } from "./authorization-midleware";

export function pipeDriveAccountValidationMiddleware(
  req: RequestMidleware,
  res: Response,
  next: NextFunction
) {
  if (
    req.username !== process.env.PIPEDRIVE_INTERNAL_WEBHOOK_USERNAME ||
    req.password !== process.env.PIPEDRIVE_INTERNAL_WEBHOOK_PASSWORD
  )
    return res.status(401).json({ message: "Unauthorized" });

  next();
}
