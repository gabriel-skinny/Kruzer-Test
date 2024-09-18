import { IProductAgregationModel } from "../../database/entities/product-agregation";

interface IProductViewModel {
  sumValue: number;
  quantity: number;
  groupDate: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export const makeProductAgregationViewModel = (
  raw: IProductAgregationModel
): IProductViewModel => {
  return {
    sumValue: raw.sumValue,
    quantity: raw.quantity,
    groupDate: raw.groupDate,
    createdAt: raw.createdAt,
    updatedAt: raw.updatedAt,
  };
};
