import { ForbiddenException } from "@/exceptions";
import { UserRole } from "@/types/user.type";
import { NextFunction, Request, Response } from "express";

export const checkRoles =
  (...roles: Array<UserRole>) =>
  (req: Request, res: Response, next: NextFunction) => {
    const userRole = req.user.role;
    if (!roles.includes(userRole)) {
      throw new ForbiddenException("Access Denied");
    }
    next();
  };
