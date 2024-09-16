import { Request, Response } from "express";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";

export class PipeDriveController {
  static async webookDealUpdate(req: Request, res: Response) {
    const user = req.headers.username;
    const password = req.headers.password;
    const body = req.body as IWebhookDealUpdateData;

    if (!user || !password) throw new Error("Unauthorized");

    if (
      user !== process.env.PIPEDRIVE_INTERNAL_WEBHOOK_USERNAME ||
      password !== process.env.PIPEDRIVE_INTERNAL_WEBHOOK_PASSWORD
    )
      throw new Error("Unauthorized");

    if (body.meta.action !== "updated" || body.event !== "updated.deal")
      throw new Error("Not suported event");
  }
}
