import express, { Request, Response } from "express";
import dotenv from "dotenv";
import todoRoutes from "./modules/todo/todo.routes";
import { connectDb } from "./config/db";

const app = express();
app.use(express.json());

dotenv.config();

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "server is running" });
});

app.use("/todo", todoRoutes);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
connectDb(MONGO_URI);

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
// http://localhost:50001/todo => post
// http://localhost:50001/todo/test => post
// http://localhost:50001/todo  => get
