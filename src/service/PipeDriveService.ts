import { IWebhookRepository } from "../database/repositories/webhookRepository";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";
import { IInsertProductParams } from "./ProductService";

interface IProductService {
  insertProduct(data: IInsertProductParams): Promise<void>;
}

export class PipeDriveService {
  constructor(
    private webhookRepository: IWebhookRepository,
    private productService: IProductService
  ) {}

  async handleUpdateDealEvent({
    data,
    meta,
    previous,
  }: IWebhookDealUpdateData) {
    if (meta.action !== "change") throw new Error("Not suported event");

    if (await this.webhookRepository.existsByExternalId(meta.id))
      throw new Error("Duplicated webhook");

    await this.webhookRepository.save({
      data,
      direction: "in",
      name: "PipeDrive",
      type: "updateDeal",
      webhook_external_id: meta.id,
    });

    if (data.status == "won" && previous.status == "open") {
      await this.productService.insertProduct({
        name: data.title,
        quantity: data.products_count,
        price: data.value,
      });
    }
  }
}
