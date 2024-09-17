import { Response } from "express";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";
import { RequestMidleware } from "../midlewares/authorization-midleware";

interface IPipeDriveService {
  handleUpdateDealEvent(data: IWebhookDealUpdateData): Promise<void>;
}

export class PipeDriveController {
  constructor(private pipeDriveService: IPipeDriveService) {}

  async webookDealUpdate(req: RequestMidleware, res: Response) {
    const body = req.body;

    if (
      req.username !== process.env.PIPEDRIVE_INTERNAL_WEBHOOK_USERNAME ||
      req.password !== process.env.PIPEDRIVE_INTERNAL_WEBHOOK_PASSWORD
    )
      return res.json({ message: "Unauthorized" }).status(401);

    try {
      await this.pipeDriveService.handleUpdateDealEvent(body);
    } catch (err) {
      console.log(err);

      return res.json({ message: "Internal server error" }).status(500);
    }
  }
}
