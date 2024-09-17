import { Request, Response } from "express";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";
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
    const { code, state } = req.params;

    if (
      req.username != process.env.BLING_CLIENT_USERNAME ||
      req.password != process.env.BLING_CLIENT_PASSWORD
    )
      return res.json({ message: "Unauthorized" }).status(401);

    await this.blingIntegration.authorizationCallBack({
      code: code,
      state: state,
    });
  }
}
