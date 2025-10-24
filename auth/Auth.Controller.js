import { PrismaClient } from "@prisma/client";
import { validatePassword } from "../utils/bcrypt.utils.js";
import { createToken } from "../utils/token.utils.js";
import { ValidationError } from "../errors/ValidationError.js";
const prisma = new PrismaClient();

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new ValidationError("Los dos campos son requeridos", 400);

  const user = await prisma.usuarios.findUnique({
    where: {
      email,
    },
  });

  if (!user) throw new ValidationError("Usuario no encontrado");

  const databasePassword = user.password;
  const result = await validatePassword(password, databasePassword);

  if (!result) throw new ValidationError("Verifique sus credenciales");

  const { access_token, refresh_token } = createToken(user);

  res.cookie("refresh_token", refresh_token, {
    httpOnly: true,
    maxAge: 3600000 * 10,
    secure: false, //process.env.NODE_ENV === "production",
    sameSite: "strict",
    path: "/",
  });

  res.status(201).json({ access_token });
};

export const logout = (req, res) => {
  res.clearCookie("refresh_token", { path: "/" });
  res.json({ bye: "xd" });
};
