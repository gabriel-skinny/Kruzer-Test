import { Model } from "mongoose";
import { IWebhookModel } from "../entities/webhook-entity";

export interface IWebhookRepository {
  save(data: Omit<IWebhookModel, "_id" | "createdAt">): Promise<void>;
  existsByExternalId(externalId: string): Promise<IWebhookModel | null>;
}

export class WebhookRepository implements IWebhookRepository {
  constructor(private webhookModel: Model<IWebhookModel>) {}

  async save(data: Omit<IWebhookModel, "_id" | "createdAt">): Promise<void> {
    await this.webhookModel.create(data);
  }

  async existsByExternalId(
    webhook_external_id: string
  ): Promise<IWebhookModel | null> {
    const webhook = await this.webhookModel.findOne({ webhook_external_id });

    if (!webhook) return null;

    return webhook;
  }
}
