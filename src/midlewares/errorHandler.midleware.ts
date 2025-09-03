import { INTERNAL_SERVER_ERROR } from "@/constants/http_status";
import { HttpException } from "@/exceptions";
import { NextFunction, Request, Response } from "express";

export const errorHandler = (
  err: Error,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  if (err instanceof HttpException) {
    return res.status(err.statusCode).json({
      stausCode: err.statusCode,
      message: err.message,
      errors: err.errors,
    });
  }

  return res.status(INTERNAL_SERVER_ERROR).json({
    stausCode: INTERNAL_SERVER_ERROR,
    message: err.message,
  });
};
