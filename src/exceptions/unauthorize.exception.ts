import { UNAUTHORIZE } from "@/constants/http_status";
import { HttpException } from "./http.exception";

export class UnauthorizeException extends HttpException {
  constructor(message: string = "Unauthorize") {
    super(UNAUTHORIZE, message);
  }
}
