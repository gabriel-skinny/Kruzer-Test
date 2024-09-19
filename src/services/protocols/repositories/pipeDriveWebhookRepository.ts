import { IPipeDriveWebhookModel } from "../../../database/entities/pipedrive-webhook-entity";

export interface IPipeDriveWebhookRepository {
  save(data: Omit<IPipeDriveWebhookModel, "_id" | "createdAt">): Promise<void>;
  existsByExternalId(
    externalId: string
  ): Promise<IPipeDriveWebhookModel | null>;
}
