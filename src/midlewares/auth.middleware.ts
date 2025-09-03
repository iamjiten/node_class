import { BadRequestException, UnauthorizeException } from "@/exceptions";

import { findById } from "@/modules/user/user.service";
import { decodeToken } from "@/utils/jwt.utils";
import { NextFunction, Request, Response } from "express";

export const checkAuth = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const SECRET = process.env.JWT_SECRET || "node_class";
  const request = req.headers;

  const requestedToken = request.authorization;
  if (!requestedToken) {
    throw new UnauthorizeException();
    res.json({ data: { success: false, message: "Token is missing" } });
    return;
  }
  const splited = requestedToken.split(" ");
  const token = splited[1];

  try {
    const decodeedToken = await decodeToken(token, SECRET);
    if (
      typeof decodeedToken == "string" &&
      `${decodeedToken}`?.toLowerCase() == "jwt expired"
    ) {
      throw new BadRequestException(`${decodeedToken}`);
      // res.json({ data: { success: false, message: decodeedToken } });
      // return;
    }

    const id = decodeedToken.sub;
    const user = await findById(id);
    // @ts-ignore
    req.user = user;
    next();
  } catch (err) {
    throw new UnauthorizeException();
    res.json({ data: { success: false, message: err.message } });
    return;
  }
};
