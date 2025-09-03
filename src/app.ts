import "module-alias/register";
import express from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import router from "./routes";
import { errorHandler } from "./midlewares";
import { UserType } from "./types/user.type";

declare global {
  namespace Express {
    interface Request {
      user?: UserType;
    }
  }
}

const app = express();
app.use(express.json());

dotenv.config();

app.use("/api", router);

app.use(errorHandler);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
connectDb(MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
