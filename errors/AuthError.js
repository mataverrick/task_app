import { CustomError } from "./CustomError.js";

export class AuthError extends CustomError {
  constructor(message = "No autorizado", status = 400) {
    super(message, status);
  }
}
