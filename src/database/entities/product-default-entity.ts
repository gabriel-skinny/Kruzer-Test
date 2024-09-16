import mongoose from "mongoose";

export const ProductDefaultSchema = new mongoose.Schema({
  id: String,
  name: String,
  teste: Number,
});

export const makeProductDefaultModel = () => {
  const ProductDefaultModel = mongoose.model(
    "ProductDefault",
    ProductDefaultSchema
  );

  return ProductDefaultModel;
};
