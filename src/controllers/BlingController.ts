import { Request, Response } from "express";
import { RequestMidleware } from "../midlewares/authorization-midleware";

interface IBlingIntegration {
  makeAuthorizationCodeUrl(): { authorizationCodeUrl: string };
  authorizationCallBack(data: { state: string; code: string }): Promise<void>;
}

export class BlingController {
  constructor(private blingIntegration: IBlingIntegration) {}

  async authorize(req: Request, res: Response) {
    const { authorizationCodeUrl } =
      this.blingIntegration.makeAuthorizationCodeUrl();

    res.redirect(authorizationCodeUrl);
  }

  async getAuthorizationCode(req: RequestMidleware, res: Response) {
    const { code, state } = req.query;

    if (!code || !state)
      return res.status(401).json({ message: "Unauthorized" });

    if (
      req.username != process.env.BLING_CLIENT_ID ||
      req.password != process.env.BLING_CLIENT_SECRET
    )
      return res.status(401).json({ message: "Unauthorized" });

    try {
      await this.blingIntegration.authorizationCallBack({
        code: code as string,
        state: state as string,
      });

      return res.status(200).json({ message: "Authorized successfully" });
    } catch (error) {
      console.log(error);

      return res.json({ error: "Internal server error" }).status(200);
    }
  }
}
