import { Model } from "mongoose";
import { IPipeDriveWebhookModel } from "../entities/pipedrive-webhook-entity";

export interface IPipeDriveWebhookRepository {
  save(data: Omit<IPipeDriveWebhookModel, "_id" | "createdAt">): Promise<void>;
  existsByExternalId(
    externalId: string
  ): Promise<IPipeDriveWebhookModel | null>;
}

export class WebhookRepository implements IPipeDriveWebhookRepository {
  constructor(private pipeDriveWebhookModel: Model<IPipeDriveWebhookModel>) {}

  async save(
    data: Omit<IPipeDriveWebhookModel, "_id" | "createdAt">
  ): Promise<void> {
    await this.pipeDriveWebhookModel.create(data);
  }

  async existsByExternalId(
    webhook_external_id: string
  ): Promise<IPipeDriveWebhookModel | null> {
    const webhook = await this.pipeDriveWebhookModel.findOne({
      webhook_external_id,
    });

    if (!webhook) return null;

    return webhook;
  }
}
