import { OK } from "@/constants/http_status";

export class HttpException extends Error {
  statusCode: number;
  message: string;
  errors: any;
  constructor(
    statusCode: number = OK,
    message: string = "Internal Server Error",
    errors?: any
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.errors = errors;
  }
}
