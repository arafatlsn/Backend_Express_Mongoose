import mongoose from "mongoose";
import { DB_NAME } from "../constants.js";

export const dbFunc = async () => {
  try {
    await mongoose.connect(`${process.env.DB_URL}/${DB_NAME}`);
  } catch (error) {
    console.error("MONGODB CONNECTION FAILED", error.message);
  }
};
