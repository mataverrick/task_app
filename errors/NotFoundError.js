import { CustomError } from "./CustomError.js";

class NotFoundError extends CustomError {
  constructor(
    message = "No se encontro el recurso solicitado",
    statusCode = 404
  ) {
    super(message, statusCode);
  }
}
