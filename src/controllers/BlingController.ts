import { Request, Response } from "express";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";

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

  async getAuthorizationCode(req: Request, res: Response) {
    const { code, state } = req.params;

    await this.blingIntegration.authorizationCallBack({
      code: code,
      state: state,
    });
  }
}
