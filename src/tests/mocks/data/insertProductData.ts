import { IInsertProductParams } from "../../../services/protocols/services/productService";

export const insertProductData: IInsertProductParams = {
  id: "uniqueId",
  name: "productName",
  totalPrice: 1000,
  itemPrice: 400,
  quantity: 10,
};
