import { Request, Response } from "express";
import { RequestMidleware } from "../midlewares/authorization-midleware";
import { IBlingIntegration } from "../services/protocols/integrations/blingIntegration";

export class BlingController {
  constructor(private blingIntegration: IBlingIntegration) {}

  async getAuthorizationCodeUrl(req: Request, res: Response) {
    const { authorizationCodeUrl } =
      this.blingIntegration.makeAuthorizationCodeUrl();

    return res.status(200).json({
      blingAuthorizationCodeUrl: authorizationCodeUrl,
    });
  }

  async authorizationCodeCallBack(req: RequestMidleware, res: Response) {
    const { code, state } = req.query;

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
