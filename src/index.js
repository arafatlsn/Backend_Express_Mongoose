import { configDotenv } from "dotenv";
configDotenv();
import { app } from "./app.js";
import { dbFunc } from "./db/index.js";

const port = process.env.PORT || 3001;
app.listen(port, () => {
  dbFunc();
  console.log(`SERVER IS RUNNING ON PORT ${port}`);
});
