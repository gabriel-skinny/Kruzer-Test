import { Model } from "mongoose";
import { IProductModel } from "../entities/product-entity";
import { IProductRepository } from "../../services/protocols/repositories/productRepository";

export class ProductRepository implements IProductRepository {
  constructor(private productModel: Model<IProductModel>) {}

  async save(
    data: Omit<IProductModel, "_id" | "createdAt">
  ): Promise<IProductModel> {
    const product = await this.productModel.create(data);

    return product;
  }

  async findManyWithErrorOnCreation(): Promise<IProductModel[]> {
    const products = await this.productModel
      .find({ errorOnCreation: true })
      .lean();

    if (!products) return [];

    return products;
  }

  async existsByPipeDriveExternalId(id: string): Promise<boolean> {
    const product = await this.productModel.exists({ pipeDriveExternalId: id });

    return !!product;
  }

  async updateById({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IProductModel>;
  }): Promise<void> {
    await this.productModel.updateOne({ _id: id }, updateData);
  }
}
