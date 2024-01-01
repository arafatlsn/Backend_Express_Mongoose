import express from "express";
import { userRegister } from "../controllers/user.controller.js";
import { upload } from "../middlewares/multer.middleware.js";

const userRoute = express.Router();

userRoute.post(
  "/user_register",
  upload.fields([
    { name: "avatar", maxCount: 1 },
    { name: "coverImage", maxCount: 1 },
  ]),
  userRegister
);

export { userRoute };
