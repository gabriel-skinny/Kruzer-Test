import { IWebhookRepository } from "../database/repositories/webhookRepository";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";
import { IBillingService } from "./BlingService";

export class PipeDriveService {
  constructor(
    private webhookRepository: IWebhookRepository,
    private blingService: IBillingService
  ) {}

  async handleUpdateDealEvent(data: IWebhookDealUpdateData) {
    if (data.meta.action !== "updated" || data.event !== "updated.deal")
      throw new Error("Not suported event");

    await this.webhookRepository.save({
      data,
      direction: "in",
      name: "PipeDrive",
      type: "updateDeal",
    });

    await this.blingService.insertProduct({
      name: data.current.title,
      quantity: data.current.products_count,
      price: data.current.value,
    });
  }
}
