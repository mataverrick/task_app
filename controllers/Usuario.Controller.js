import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/bcrypt.utils.js";
import { createToken } from "../utils/token.utils.js";
import { ValidationError } from "../errors/ValidationError.js";

const prisma = new PrismaClient();

export const crearUsuario = async (req, res) => {
  const { nombre, email, password } = req.body;

  try {
    if (!nombre) throw new ValidationError("El nombre es obligatorio");
    if (!email) throw new ValidationError("El email es obligatorio");
    if (!password) throw new ValidationError("El password es obligatorio");
    //falta mejorar validaciones, solo es provicional para tener algo funcional

    const hashedPassword = await hashPassword(password);

    const user = await prisma.usuarios.create({
      data: {
        nombre,
        email,
        password: hashedPassword,
        usuario_rol_id: 2,
      },
    });

    const { access_token, refresh_token } = createToken(user);

    res.cookie("refresh_token", refresh_token, {
      httpOnly: true,
      maxAge: 3600000 * 10,
      secure: false, //process.env.NODE_ENV === "production",
      sameSite: "strict",
      path: "/",
    });

    res
      .status(201)
      .json({ Usuario: "Usuario Creado Correctamente", token: access_token });
  } catch (error) {
    res.status(401).json({ error: error.message });
  }
};

export const obtenerUsuario = async(req, res) => {
  const { usuario_id, usuario_rol_id } = req.payload;

  const usuario = await prisma.usuarios.findMany({
    where: {
      usuario_id,
    },
    include: {
      tareas: true,
    },
  });

  res.json(usuario);
};


