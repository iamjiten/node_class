import { Request, Response } from "express";
import { createUser } from "./user.service";
import { CREATED } from "@/constants/http_status";

export const createUserHandler = async (req: Request, res: Response) => {
  const body = req.body;
  const user = await createUser(body);

  res.status(CREATED).json({
    message: "User created",
    success: true,
    statusCode: CREATED,
    data: {
      user,
    },
  });
};
