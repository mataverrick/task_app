import { AuthError } from "../errors/AuthError.js";

export const verfiyRol = (...rol) => {
  return (req, res, next) => {
    const { usuario_rol_id } = req.payload;

    if (!rol.includes(usuario_rol_id)) throw new AuthError();

    next();
  };
};
