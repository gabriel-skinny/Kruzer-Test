import { IProductModel } from "../../../database/entities/product-entity";

export const makeProductModel = (
  data?: Partial<IProductModel>
): IProductModel => {
  return {
    _id: "uniqueId",
    name: "productName",
    errorOnCreation: false,
    errorCreationMessage: undefined,
    pipeDriveExternalId: "externalId",
    blingExternalId: undefined,
    price: 100,
    productAgregationId: "productAgregationId",
    quantity: 10,
    createdAt: new Date(),
    updatedAt: undefined,
    ...data,
  };
};
