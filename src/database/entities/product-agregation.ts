import mongoose, { Schema } from "mongoose";

export interface IProductAgregationModel {
  _id: string;
  sumValue: number;
  quantity: number;
  createdAt: Date;
  updatedAt?: Date;
}

export const ProductAgregationSchema: {
  [key in keyof Omit<IProductAgregationModel, "_id" | "createdAt">]: any;
} = {
  sumValue: Number,
  quantity: Number,
};

export const ProductAgregationModel = mongoose.model<IProductAgregationModel>(
  "ProductAgregation",
  new Schema(ProductAgregationSchema, { timestamps: true })
);
