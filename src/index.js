import { configDotenv } from "dotenv";
configDotenv();
import express from "express";
const app = express();
import { dbFunc } from "./db/index.js";

// middlewares

app.get("/api/v1/hello-express", (req, res) => {
  res.send("express server response");
  UserModel;
});

const port = process.env.PORT || 3001;
app.listen(port, () => {
  dbFunc();
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
