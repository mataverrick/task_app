import { PrismaClient } from "@prisma/client";
import { validatePassword } from "../utils/bcrypt.utils.js";
import { createToken } from "../utils/token.utils.js";

const prisma = new PrismaClient();

export const loginUsuario = async (req, res) => {
  const { email, password } = req.body;

  try {
    if (!email) throw new Error("Falta el email");
    if (!password) throw new Error("Falta el password"); //mejorar validaciones

    const user = await prisma.usuarios.findUnique({
      where: {
        email,
      },
    });

    if (!user) throw new Error("Usuario no encontrado");

    const databasePassword = user.password;
    const result = await validatePassword(password, databasePassword);

    if (!result) throw new Error("Verifique sus credenciales");

    const { access_token, refresh_token } = createToken(user);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 3600000 * 10,
      secure: false, //process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res.status(201).json({ access_token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const logout = (req, res) => {
  try {
    res.clearCookie("refresh_token", { path: "/" });
    res.json({bye:"xd"})
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};
