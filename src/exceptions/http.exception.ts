import { OK } from "@/constants/http_status";

export class HttpException extends Error {
  statusCode: number;
  message: string;
  constructor(statusCode: number = OK, message: string = "") {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
  }
}
