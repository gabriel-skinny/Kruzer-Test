import { IPipeDriveWebhookModel } from "../../../database/entities/pipedrive-webhook-entity";
import { IPipeDriveWebhookRepository } from "../../../services/protocols/repositories/pipeDriveWebhookRepository";

export class InMemoryPipeDriveWebhookRepository
  implements IPipeDriveWebhookRepository
{
  public database: IPipeDriveWebhookModel[] = [];

  async save(
    data: Omit<IPipeDriveWebhookModel, "_id" | "createdAt">
  ): Promise<void> {
    this.database.push({ _id: "uniqueId123", ...data, createdAt: new Date() });
  }

  async existsByExternalId(
    externalId: string
  ): Promise<IPipeDriveWebhookModel | null> {
    const webhook = this.database.find(
      (webhook) => webhook.webhook_external_id == externalId
    );

    if (!webhook) return null;

    return webhook;
  }
}
