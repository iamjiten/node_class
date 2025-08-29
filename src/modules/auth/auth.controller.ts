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
import { encodeToken } from "@/utils/jwt.utils";
import { CustomJwtPayload } from "@/types/jwt.type";
import { SignOptions } from "jsonwebtoken";

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

  const accessTokenExpiresIn = Number(process.env.JWT_EXPIRES_IN) || 60 * 60;
  const jwtSecre = process.env.JWT_SECRET || "node_class";

  const refreshTokenExpiresIn =
    Number(process.env.JWT_REFRESH_EXPIRES_IN) || 60 * 60;
  const refreshJwtSecre = process.env.JWT_REFRESH_SECRET || "node_class";

  const jwtData: {
    payload: CustomJwtPayload;
    secret: string;
    options: SignOptions;
  } = {
    payload: {
      sub: `${existUser.id}`,
      email: existUser.email,
    },
    secret: jwtSecre,
    options: { expiresIn: accessTokenExpiresIn },
  };

  const refreshJwtData: {
    payload: CustomJwtPayload;
    secret: string;
    options: SignOptions;
  } = {
    payload: {
      sub: `${existUser.id}`,
      email: existUser.email,
    },
    secret: refreshJwtSecre,
    options: { expiresIn: refreshTokenExpiresIn },
  };

  console.time("startTime");
  // const accessToken = await encodeToken(jwtData); // 800ms
  // const refreshToken = await encodeToken(refreshJwtData); // 300ms
  // // 1100ms
  const [accessToken, refreshToken] = await Promise.all([
    encodeToken(jwtData),
    encodeToken(refreshJwtData),
  ]);
  console.timeEnd("startTime");
  console.log({ accessToken });
  res
    .status(OK)
    .json({ data: { access_token: accessToken, refresh_token: refreshToken } });
};
