import { NextFunction, Request, Response } from "express";
import { ZodSchema } from "zod";
import { UNPROCESSABLE_CONTENT } from "../constants/http_status";

export const validate =
  (schema: ZodSchema) => (req: Request, res: Response, next: NextFunction) => {
    const result = schema.safeParse(req.body);
    if (!result.success) {
      const errors = Object.fromEntries(
        Object.entries(result.error.format())
          .map(([key, value]: any) => {
            // Only include the field if there are actual errors
            const errors = value._errors || [];
            return errors.length > 0 ? [key, errors[0]] : null;
          })
          .filter(Boolean) // Remove any null entries
      );

      res.status(UNPROCESSABLE_CONTENT).json({
        message: "Validation Error",
        success: false,
        statusCode: UNPROCESSABLE_CONTENT,
        data: null,
        errors,
      });
      return;
    }
    next();
  };
