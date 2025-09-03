import { UNPROCESSABLE_CONTENT } from "@/constants/http_status";
import { HttpException } from "./http.exception";

export class UnProcessableException extends HttpException {
  constructor(erros: any, message: string = "Validation Failed") {
    super(UNPROCESSABLE_CONTENT, message);
  }
}
