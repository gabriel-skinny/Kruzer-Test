import { IPipeDriveWebhookRepository } from "../database/repositories/pipeDriveWebhookRepository";
import { IGetProductsFromDealData } from "../integration/interface";
import { IWebhookDealUpdateData } from "./interface";

import { IInsertProductParams } from "./ProductService";

interface IProductService {
  insertProduct(data: IInsertProductParams): Promise<void>;
}

interface IPipeDriveIntegration {
  getProductsFromDeal(dealId: string): Promise<IGetProductsFromDealData[]>;
}

export class PipeDriveService {
  constructor(
    private pipedriveWebhookRepository: IPipeDriveWebhookRepository,
    private productService: IProductService,
    private pipeDriveIntegration: IPipeDriveIntegration
  ) {}

  async handleUpdateDealEvent({
    data,
    meta,
    previous,
  }: IWebhookDealUpdateData) {
    if (meta.action !== "change") throw new Error("Not suported action");

    if (await this.pipedriveWebhookRepository.existsByExternalId(meta.id))
      throw new Error("Duplicated webhook");

    if (data.status == "won" && previous.status == "open") {
      try {
        const productsOnDeal =
          await this.pipeDriveIntegration.getProductsFromDeal(String(data.id));

        for (const product of productsOnDeal) {
          await this.productService.insertProduct({
            id: String(product.id),
            name: product.name,
            quantity: product.quantity,
            itemPrice: product.item_price,
            totalPrice: product.sum,
          });
        }
      } catch (error: any) {
        console.log(error);
      }
    }

    await this.pipedriveWebhookRepository.save({
      dealData: data,
      type: "changeDeal",
      webhook_external_id: meta.id,
    });
  }
}
