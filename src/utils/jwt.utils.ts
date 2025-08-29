import { CustomJwtPayload } from "@/types/jwt.type";
import jwt, { SignOptions } from "jsonwebtoken";

export const encodeToken = async (data: {
  payload: CustomJwtPayload;
  secret: string;
  options: SignOptions;
}): Promise<string> => {
  return jwt.sign(data.payload, data.secret, data.options);
};

export const decodeToken = async (
  token: string,
  secret: string
): Promise<{ sub: string; email: string }> => {
  try {
    const decoded: any = await jwt.verify(token, secret);
    return { sub: decoded.sub, email: decoded.email };
  } catch (err) {
    // if (err instanceof TokenExpiredError) {
    //   return "Token Expired";
    // }
    return err.message;
  }
};
