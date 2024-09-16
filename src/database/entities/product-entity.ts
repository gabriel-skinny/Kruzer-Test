import mongoose from "mongoose";

export const OportunitySchema = new mongoose.Schema({
  id: String,
  name: String,
  teste: Number,
});

export const makeOportunityModel = () => {
  const OportunityModel = mongoose.model("Oportunity", OportunitySchema);

  return OportunityModel;
};
