import { Model } from "mongoose";
import { IWebhookModel } from "../entities/webhook-entity";

export interface IWebhookRepository {
  save(data: IWebhookModel): Promise<void>;
}

export class WebhookRepository implements IWebhookRepository {
  constructor(private webhookModel: Model<IWebhookModel>) {}

  async save(data: IWebhookModel): Promise<void> {
    await this.webhookModel.create(data);
  }
}
