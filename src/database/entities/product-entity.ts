import mongoose, { Schema } from "mongoose";

export interface IProductModel {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

export const ProductSchema: { [key in keyof IProductModel]: any } = {
  _id: Schema.ObjectId,
  name: String,
  price: Number,
  quantity: Number,
};

export const makeProductModel = () => {
  const ProductModel = mongoose.model("Product", new Schema(ProductSchema));

  return ProductModel;
};
