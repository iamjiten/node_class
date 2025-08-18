import express, { Request, Response } from "express";
import dotenv from "dotenv";

const app = express();
app.use(express.json());

dotenv.config();

app.get("/health", (req: Request, res: Response) => {
  res.json({ message: "server is running" });
});

interface ITodo {
  title: string;
  status: boolean;
}

const todos: ITodo[] = [];

app.post("/todo", (req: Request, res: Response) => {
  const data = req.body;
  todos.push({
    title: data.title,
    status: data.status,
  });
  res.json(data);
});

app.get("/get_todo", (req: Request, res: Response) => {
  res.json(todos);
});

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running: http://localhost:${PORT}`);
});
