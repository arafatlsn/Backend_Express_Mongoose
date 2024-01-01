import express from "express";
import cookieParser from "cookie-parser";
import { asyncHandler } from "./utils/asyncHandler.js";
const app = express();

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// rotues
app.get(
  "/",
  asyncHandler((req, res, next) => {
    console.log(req.body);
    res.send("hello world");
  })
);

// routes import
import { userRoute } from "./routes/user.route.js";

// routes declaration
app.use("/api/v1/user", userRoute);

export { app };
