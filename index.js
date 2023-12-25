require("dotenv").config();
const express = require("express");
const app = express();

const port = 3001;

app.get("/", (req, res) => {
  console.log("hello world");
  res.status(200).send({ message: "this response from express server." });
});

app.listen(process.env.PORT, () => {
  console.log(`express server is running on port ${port}`);
});
