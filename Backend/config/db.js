import mongoose from "mongoose";

export const dbConnect = async () => {
  const uri = process.env.MONGO_URI;
  if (!uri) throw new Error("MONGO_URI is not set");
  await mongoose.connect(uri);
  console.log("Db connected successfully");
};
