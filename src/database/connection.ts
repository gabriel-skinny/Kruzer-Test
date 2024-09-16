import mongoose from "mongoose";

export async function makeMongoConnection() {
  const mongoConnection = await mongoose.connect(
    process.env.MONGO_URL as string
  );
}
