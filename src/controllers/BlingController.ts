import { Request, Response } from "express";
import { RequestMidleware } from "../midlewares/authorization-midleware";

interface IBlingIntegration {
  makeAuthorizationCodeUrl(): { authorizationCodeUrl: string };
  authorizationCallBack(data: { state: string; code: string }): Promise<void>;
}

export class BlingController {
  constructor(private blingIntegration: IBlingIntegration) {}

  async requestAuthorizationCode(req: Request, res: Response) {
    const { authorizationCodeUrl } =
      this.blingIntegration.makeAuthorizationCodeUrl();

    res.redirect(authorizationCodeUrl);
  }

  async authorizationCodeCallBack(req: RequestMidleware, res: Response) {
    const { code, state } = req.query;

    if (!code || !state)
      return res.status(401).json({ message: "Unauthorized" });

    try {
      await this.blingIntegration.authorizationCallBack({
        code: code as string,
        state: state as string,
      });

      return res.status(200).json({ message: "Authorized successfully" });
    } catch (error) {
      console.log(error);

      return res.status(500).json({ error: "Internal server error" });
    }
  }
}
