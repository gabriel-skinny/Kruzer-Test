import { Model } from "mongoose";
import { IPipeDriveWebhookModel } from "../entities/pipedrive-webhook-entity";

export interface IPipeDriveWebhookRepository {
  save(data: Omit<IPipeDriveWebhookModel, "_id" | "createdAt">): Promise<void>;
  existsByExternalId(
    externalId: string
  ): Promise<IPipeDriveWebhookModel | null>;
  findManyWithErrorOnProductCreation(): Promise<IPipeDriveWebhookModel[]>;
  updateById({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IPipeDriveWebhookModel>;
  }): Promise<void>;
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

  async findManyWithErrorOnProductCreation(): Promise<
    IPipeDriveWebhookModel[]
  > {
    const webhooks = await this.pipeDriveWebhookModel.find({
      errorOnProductCreation: true,
    });

    if (!webhooks) return [];

    return webhooks;
  }

  async updateById({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IPipeDriveWebhookModel>;
  }): Promise<void> {
    await this.pipeDriveWebhookModel.updateOne({ _id: id }, updateData);
  }
}
