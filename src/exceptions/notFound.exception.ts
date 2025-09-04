import { NOT_FOUND } from "@/constants/http_status";
import { HttpException } from "./http.exception";

export class NotFoundException extends HttpException {
  constructor(message: string = "Resource Not Found") {
    super(NOT_FOUND, message);
  }
}
