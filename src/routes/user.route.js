import express from "express";
import { userRegister } from "../controllers/user.controller.js";

const userRoute = express.Router();

userRoute.get("/user_register", userRegister);

export { userRoute };
