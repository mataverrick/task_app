import { PrismaClient } from "@prisma/client";
import { hashPassword } from "../utils/bcrypt.utils.js";
import { ValidationError } from "../errors/ValidationError.js";

const prisma = new PrismaClient();

export const crearUsuario = async (req, res) => {
  const { nombre, email, password, usuario_rol_id } = req.body;

  if (!nombre) throw new ValidationError("El nombre es obligatorio");
  if (!email) throw new ValidationError("El email es obligatorio");
  if (!password) throw new ValidationError("El password es obligatorio");
  if (!usuario_rol_id) throw new ValidationError("El rol es obligatorio");
  //falta mejorar validaciones, solo es provicional para tener algo funcional

  const hashedPassword = await hashPassword(password);

  await prisma.usuarios.create({
    data: {
      nombre,
      email,
      password: hashedPassword,
      usuario_rol_id: parseInt(usuario_rol_id),
    },
  });

  res.json({ Usuario: "Usuario creado correctamente" });
};

export const obtenerUsuario = async (req, res) => {
  const { usuario_id } = req.payload;

  const usuario = await prisma.usuarios.findUnique({
    where: {
      usuario_id,
    },
    omit: {
      password: true,
    },
    include: {
      tareas: true,
    },
  });

  res.json(usuario);
};

export const obtenerUsarios = async (req, res) => {
  const { usuario_id } = req.payload;

  const usuarios = await prisma.usuarios.findMany({
    where: {
      usuario_id: { not: usuario_id },
    },
    omit: {
      password: true,
    },
  });

  res.json(usuarios);
};

export const eliminarUsuario = async (req, res) => {
  const { usuario_id } = req.params;

  await prisma.usuarios.delete({
    where: {
      usuario_id: parseInt(usuario_id),
    },
  });

  res.json({ Usuario: "El usuario ha sido eliminado con exito" });
};

export const editarUsuario = async (req, res) => {
  const { usuario_id } = req.params;
  const { nombre, email, usuario_rol_id } = req.body;

  await prisma.usuarios.update({
    where: {
      usuario_id: parseInt(usuario_id),
    },
    data: {
      nombre,
      email,
      usuario_rol_id: parseInt(usuario_rol_id),
    },
  });

  res.json({ Usuario: "Usuario editado correctamente" });
};
