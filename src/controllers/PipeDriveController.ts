import { Request, Response } from "express";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";
import { RequestMidleware } from "../midlewares/authorization-midleware";

interface IPipeDriveService {
  handleUpdateDealEvent(data: IWebhookDealUpdateData): Promise<void>;
  retryProductCreation(): Promise<{
    webhooksToRetry: number;
    sucessCount: number;
  }>;
}

export class PipeDriveController {
  constructor(private pipeDriveService: IPipeDriveService) {}

  async webookDealUpdate(req: RequestMidleware, res: Response) {
    const body = req.body as IWebhookDealUpdateData;

    if (
      req.username !== process.env.PIPEDRIVE_INTERNAL_WEBHOOK_USERNAME ||
      req.password !== process.env.PIPEDRIVE_INTERNAL_WEBHOOK_PASSWORD
    )
      return res.status(401).json({ message: "Unauthorized" });

    try {
      await this.pipeDriveService.handleUpdateDealEvent(body);

      return res.status(200).json({ message: "Webhook received successfully" });
    } catch (err) {
      console.log(err);

      return res.status(500).json({ message: "Internal server error" });
    }
  }

  async retryProductCreation(req: Request, res: Response) {
    try {
      const { sucessCount, webhooksToRetry } =
        await this.pipeDriveService.retryProductCreation();

      return res.status(200).json({
        message: `Total webhooks: ${webhooksToRetry} and Webhooks sucessfully retried: ${sucessCount}`,
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json({ message: "Internal Server Error" });
    }
  }
}
