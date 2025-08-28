import "module-alias/register";
import express, { Request, Response } from "express";
import dotenv from "dotenv";
import { connectDb } from "./config/db";
import router from "./routes";

const app = express();
app.use(express.json());

dotenv.config();

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "server is running" });
});

app.use("/api", router);

const PORT = process.env.PORT;
const MONGO_URI = process.env.MONGO_URI;
connectDb(MONGO_URI);

// const saltRounds = 10;
// const pwd = "test";
// const hashPwd = bcrypt.hashSync(pwd, saltRounds);

// const pwdnew = "Test";
// const isVerify = bcrypt.compareSync(pwdnew, hashPwd);
// console.log({ isVerify, hashPwd });

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
// http://localhost:50001/api/todo => post
// http://localhost:50001/api/todo/test => post
// http://localhost:50001/api/todo  => get
