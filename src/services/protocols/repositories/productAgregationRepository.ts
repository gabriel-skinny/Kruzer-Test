import { IProductAgregationModel } from "../../../database/entities/product-agregation";

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
