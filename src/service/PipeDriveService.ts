import { IWebhookRepository } from "../database/repositories/webhookRepository";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";

export class PipeDriveService {
  constructor(private webhookRepository: IWebhookRepository) {}

  async handleUpdateDealEvent(data: IWebhookDealUpdateData) {
    await this.webhookRepository.save({
      data,
      direction: "in",
      name: "PipeDrive",
      type: "updateDeal",
    });
  }
}
