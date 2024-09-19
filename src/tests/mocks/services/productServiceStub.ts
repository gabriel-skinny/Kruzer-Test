import { IProductAgregationModel } from "../../../database/entities/product-agregation";
import {
  IInsertProductParams,
  IProductService,
} from "../../../services/protocols/services/productService";

export class ProductServiceStub implements IProductService {
  insertProduct({
    id,
    name,
    totalPrice,
    itemPrice,
    quantity,
  }: IInsertProductParams): Promise<{ productId: string }> {
    throw new Error("Method not implemented.");
  }
  agregateProduct({
    price,
    quantity,
  }: {
    price: number;
    quantity: number;
  }): Promise<{ productAgregationId: string }> {
    throw new Error("Method not implemented.");
  }
  getProductAgregations(filter?: {
    startDate: Date;
    endDate: Date;
  }): Promise<IProductAgregationModel[]> {
    throw new Error("Method not implemented.");
  }
  retryProductCreation(): Promise<{
    totalProductToRetry: number;
    sucessCount: number;
  }> {
    throw new Error("Method not implemented.");
  }
}
