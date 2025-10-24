import { CustomError } from "./CustomError.js";

export class ValidationError extends CustomError {
  constructor(
    message = "Validacion fallida,verifique sus crdenciales",
    status = 400
  ) {
    super(message, status);
  }
}
