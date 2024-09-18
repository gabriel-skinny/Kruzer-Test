import { Model } from "mongoose";
import { IProductAgregationModel } from "../entities/product-agregation";

export interface IProductAgregationRepository {
  save(
    data: Omit<IProductAgregationModel, "_id" | "createdAt">
  ): Promise<IProductAgregationModel>;
  findByGroupDate(date: Date): Promise<IProductAgregationModel | null>;
  updateById(data: {
    id: string;
    updateData: Partial<IProductAgregationModel>;
  }): Promise<void>;
  findManyOnGroupDateRange(filter?: {
    startDate: Date;
    endDate: Date;
  }): Promise<IProductAgregationModel[]>;
}

export class ProductAgregationRepository
  implements IProductAgregationRepository
{
  constructor(private productAgregationModel: Model<IProductAgregationModel>) {}

  async save(
    data: Omit<IProductAgregationModel, "_id" | "createdAt">
  ): Promise<IProductAgregationModel> {
    const productModel = await this.productAgregationModel.create(data);

    return productModel;
  }

  async updateById({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IProductAgregationModel>;
  }): Promise<void> {
    await this.productAgregationModel.updateOne({ _id: id }, updateData);
  }

  async findByGroupDate(date: Date): Promise<IProductAgregationModel | null> {
    const productAgregation = await this.productAgregationModel
      .findOne({
        groupDate: date,
      })
      .lean();

    if (!productAgregation) return null;

    return productAgregation;
  }

  async findManyOnGroupDateRange(filter?: {
    startDate: Date;
    endDate: Date;
  }): Promise<IProductAgregationModel[]> {
    let where = {};

    if (filter?.startDate && filter.endDate)
      where = {
        groupDate: { $gte: filter.startDate, $lt: filter.endDate },
      };

    const productAgregation = await this.productAgregationModel
      .find(where)
      .sort({ createdAt: "desc" })
      .lean();

    if (!productAgregation) return [];

    return productAgregation;
  }
}
