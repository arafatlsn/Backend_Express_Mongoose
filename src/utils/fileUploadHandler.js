import { configDotenv } from "dotenv";
configDotenv();
import { v2 as cloudinary } from "cloudinary";
import fs from "fs";

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadHandler = async (filePath) => {
  try {
    if (!filePath) {
      return null;
    }
    const res = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });
    return res;
  } catch (error) {
    fs.unlinkSync(filePath);
    console.log("failed to upload file ", error);
    return error.message;
  }
};

export { uploadHandler };
