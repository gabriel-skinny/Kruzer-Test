import { Model } from "mongoose";
import { IProductModel } from "../entities/product-entity";

export interface IProductRepository {
  save(data: Omit<IProductModel, "_id" | "createdAt">): Promise<void>;
}

export class ProductRepository implements IProductRepository {
  constructor(private productModel: Model<IProductModel>) {}

  async save(data: Omit<IProductModel, "_id" | "createdAt">): Promise<void> {
    await this.productModel.create(data);
  }
}
