import { IProductModel } from "../../../database/entities/product-entity";

export interface IProductRepository {
  save(data: Omit<IProductModel, "_id" | "createdAt">): Promise<IProductModel>;
  findManyWithErrorOnCreation(): Promise<IProductModel[]>;
  updateById({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IProductModel>;
  }): Promise<void>;
  existsByPipeDriveExternalId(id: string): Promise<boolean>;
}
