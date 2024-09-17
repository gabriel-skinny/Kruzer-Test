import { IPipeDriveWebhookRepository } from "../database/repositories/pipeDriveWebhookRepository";
import { IWebhookDealUpdateData } from "../interfaces/webhookDealUpdate";
import { IInsertProductParams } from "./ProductService";

interface IProductService {
  insertProduct(data: IInsertProductParams): Promise<void>;
}

export class PipeDriveService {
  constructor(
    private pipedriveWebhookRepository: IPipeDriveWebhookRepository,
    private productService: IProductService
  ) {}

  async handleUpdateDealEvent({
    data,
    meta,
    previous,
  }: IWebhookDealUpdateData) {
    if (meta.action !== "change") throw new Error("Not suported action");

    if (await this.pipedriveWebhookRepository.existsByExternalId(meta.id))
      throw new Error("Duplicated webhook");

    let errorCreatingProduct = false;
    if (data.status == "won" && previous.status == "open") {
      try {
        await this.productService.insertProduct({
          name: data.title,
          quantity: data.products_count,
          price: data.value,
        });
      } catch (error) {
        errorCreatingProduct = true;
      }
    }

    await this.pipedriveWebhookRepository.save({
      data,
      type: "changeDeal",
      errorOnProductCreation: errorCreatingProduct,
      webhook_external_id: meta.id,
    });
  }

  async retryProductCreation(): Promise<{
    webhooksToRetry: number;
    sucessCount: number;
  }> {
    const webhooksToRetry =
      await this.pipedriveWebhookRepository.findManyWithErrorOnProductCreation();

    let sucessCount = 0;
    for (const webhook of webhooksToRetry) {
      try {
        await this.productService.insertProduct({
          name: webhook.data.title,
          quantity: webhook.data.products_count,
          price: webhook.data.value,
        });

        await this.pipedriveWebhookRepository.updateById({
          id: webhook._id,
          updateData: { errorOnProductCreation: false },
        });

        sucessCount++;
      } catch (error) {
        console.log(error);
      }
    }

    return {
      sucessCount,
      webhooksToRetry: webhooksToRetry.length,
    };
  }
}
