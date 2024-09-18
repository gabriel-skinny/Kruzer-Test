import mongoose from "mongoose";

export async function makeMongoConnection() {
  await mongoose.connect(process.env.MONGO_URL as string);
}
