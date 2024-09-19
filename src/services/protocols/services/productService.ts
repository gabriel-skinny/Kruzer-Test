import { IProductAgregationModel } from "../../../database/entities/product-agregation";

export interface IInsertProductParams {
  id: string;
  totalPrice: number;
  itemPrice: number;
  name: string;
  quantity: number;
}

export interface IProductService {
  insertProduct({
    id,
    name,
    totalPrice,
    itemPrice,
    quantity,
  }: IInsertProductParams): Promise<{ productId: string } | undefined>;
  getProductAgregations(filter?: {
    startDate: Date;
    endDate: Date;
  }): Promise<IProductAgregationModel[]>;
  retryProductCreation(): Promise<{
    totalProductToRetry: number;
    sucessCount: number;
  }>;
}
