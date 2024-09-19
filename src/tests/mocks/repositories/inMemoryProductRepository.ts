import { IProductModel } from "../../../database/entities/product-entity";
import { IProductRepository } from "../../../services/protocols/repositories/productRepository";

export class InMemoryProductRepository implements IProductRepository {
  public database: IProductModel[] = [];

  async save(
    data: Omit<IProductModel, "_id" | "createdAt">
  ): Promise<IProductModel> {
    const productCreated = {
      _id: "uniqueId123",
      ...data,
      createdAt: new Date(),
    };
    this.database.push(productCreated);

    return productCreated;
  }
  async findManyWithErrorOnCreation(): Promise<IProductModel[]> {
    return this.database.filter((product) => product.errorOnCreation);
  }

  async updateById({
    id,
    updateData,
  }: {
    id: string;
    updateData: Partial<IProductModel>;
  }): Promise<void> {
    const productIndex = this.database.findIndex((p) => p._id == id);

    this.database[productIndex] = Object.assign(
      this.database[productIndex],
      updateData
    );
  }

  async existsByPipeDriveExternalId(id: string): Promise<boolean> {
    return !!this.database.find((product) => product.pipeDriveExternalId == id);
  }
}
