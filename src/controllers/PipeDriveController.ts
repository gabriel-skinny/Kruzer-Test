import { Response } from "express";

import { RequestMidleware } from "../midlewares/authorization-midleware";
import { IPipeDriveService } from "../services/protocols/services/pipeDriveService";
import { IWebhookDealUpdateData } from "../services/protocols/integrations/webhookDealUpdate";

export class PipeDriveController {
  constructor(private pipeDriveService: IPipeDriveService) {}

  async webookDealUpdate(req: RequestMidleware, res: Response) {
    const body = req.body as IWebhookDealUpdateData;

    try {
      await this.pipeDriveService.handleUpdateDealEvent(body);

      return res.status(200).json({ message: "Webhook received successfully" });
    } catch (err) {
      console.log(err);

      return res.status(200).json({ message: "Internal server error" });
    }
  }
}
