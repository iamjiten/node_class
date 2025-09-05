import { FORBIDEN } from "@/constants/http_status";
import { HttpException } from "./http.exception";

export class ForbiddenException extends HttpException {
  constructor(message: string = "Forbidden") {
    super(FORBIDEN, message);
  }
}
