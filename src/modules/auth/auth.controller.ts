import { Request, Response } from "express";
import { createUser, findOneBy } from "../user/user.service";
import {
  CONFLICT,
  CREATED,
  NOT_FOUND,
  OK,
  UNPROCESSABLE_CONTENT,
} from "@/constants/http_status";
import bcrypt from "bcrypt";

export const registerHandler = async (req: Request, res: Response) => {
  const body = req.body;
  const existUser = await findOneBy({ email: body.email });

  if (existUser) {
    return res.status(CONFLICT).json({
      data: {
        success: false,
        message: "Email already exits",
      },
    });
  }

  const user = await createUser(body);
  return res.status(CREATED).json({ data: { user } });
};

export const loginHandler = async (req: Request, res: Response) => {
  const body = req.body;
  const existUser = await findOneBy({ email: body.email });

  if (!existUser) {
    return res.status(NOT_FOUND).json({
      data: {
        success: false,
        message: "User not found",
      },
    });
  }

  const isVerify = bcrypt.compareSync(body.password, existUser.password);

  if (!isVerify) {
    return res.status(UNPROCESSABLE_CONTENT).json({
      data: {
        success: false,
        message: "Email/Password does not match",
      },
    });
  }
  res.status(OK).json({ data: { user: existUser } });
};
