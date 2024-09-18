import mongoose, { Schema } from "mongoose";

export interface IProductModel {
  _id: string;
  name: string;
  price: number;
  productAgregationId: string;
  quantity: number;
  pipeDriveExternalId: string;
  blingExternalId?: string;
  errorOnCreation: boolean;
  errorCreationMessage?: string | null;
  createdAt: Date;
  updatedAt?: Date;
}

export const ProductSchema: {
  [key in keyof Omit<IProductModel, "_id" | "createdAt">]: any;
} = {
  name: String,
  price: Number,
  quantity: Number,
  errorOnCreation: Boolean,
  errorCreationMessage: String,
  pipeDriveExternalId: String,
  blingExternalId: String,
  productAgregationId: Schema.ObjectId,
};

export const ProductModel = mongoose.model<IProductModel>(
  "Product",
  new Schema(ProductSchema, { timestamps: true })
);
