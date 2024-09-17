import { NextFunction, Request, Response } from "express";
import { BasicAuthHelper } from "../helpers/basicAuth";

export type RequestMidleware = {
  username?: string;
  password?: string;
} & Request;

export function authorizationMidleware(
  req: RequestMidleware,
  res: Response,
  next: NextFunction
) {
  if (!req.headers.authorization) {
    return res.json({ message: "Unauthorized" }).status(401);
  }

  try {
    const { username, password } = BasicAuthHelper.decode(
      req.headers.authorization
    );

    req.username = username;
    req.password = password;

    next();
  } catch (error) {
    console.log(error);
    return res.json({ message: "Unauthorized" }).status(401);
  }
}
