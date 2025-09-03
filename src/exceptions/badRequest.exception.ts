import { BAD_REQUEST } from "@/constants/http_status";
import { HttpException } from "./http.exception";

export class BadRequestException extends HttpException {
  constructor(message: string = "Bad Request") {
    super(BAD_REQUEST, message);
  }
}
