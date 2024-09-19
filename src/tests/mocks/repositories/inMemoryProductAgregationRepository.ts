import { IProductAgregationModel } from "../../../database/entities/product-agregation";
import { IProductAgregationRepository } from "../../../services/protocols/repositories/productAgregationRepository";

export class InMemoryProductAgregationRepository
  implements IProductAgregationRepository
{
  public database: IProductAgregationModel[] = [];

  async save(
    data: Omit<IProductAgregationModel, "_id" | "createdAt">
  ): Promise<IProductAgregationModel> {
    const productCreated = {
      _id: "uniqueId123",
      ...data,
      createdAt: new Date(),
    };
    this.database.push(productCreated);

    return productCreated;
  }

  async findByGroupDate(date: Date): Promise<IProductAgregationModel | null> {
    const product = this.database.find((product) => product.groupDate == date);

    if (!product) return null;

    return product;
  }

  async updateById({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IProductAgregationModel>;
  }): Promise<void> {
    const productIndex = this.database.findIndex((p) => p._id == id);

    this.database[productIndex] = Object.assign(
      this.database[productIndex],
      updateData
    );
  }

  async findManyOnGroupDateRange(filter?: {
    startDate: Date;
    endDate: Date;
  }): Promise<IProductAgregationModel[]> {
    if (filter)
      return this.database.filter(
        (product) =>
          filter.startDate < product.groupDate &&
          filter.endDate > product.groupDate
      );
    else return this.database;
  }
}
