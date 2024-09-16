import { Model } from "mongoose";
import { IProductModel } from "../entities/product-entity";
import { IWebhookModel } from "../entities/webhook-entity";

export interface IProductRepository {
  save(data: Omit<IProductModel, "_id">): Promise<void>;
}

export class ProductRepository implements IProductRepository {
  constructor(private webhookModel: Model<IWebhookModel>) {}

  async save(data: Omit<IProductModel, "_id">): Promise<void> {
    await this.webhookModel.create(data);
  }
}
