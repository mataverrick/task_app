import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const crearTarea = async (req, res) => {
  const { usuario_id } = req.payload;

  const { titulo, descripcion, estado, fecha_limite } = req.body;

  await prisma.tareas.create({
    data: {
      titulo,
      descripcion,
      fecha_limite,
      estado,
      tarea_usuario_id: parseInt(usuario_id),
    },
  });

  res.json({ Tarea: "La tarea ha sido creada con exito" });
};

export const actualizarTarea = async (req, res) => {
  const { tarea_id } = req.params;
  const { titulo, descripcion, estado, fecha_limite } = req.body;

  await prisma.tareas.update({
    where: {
      tarea_id: parseInt(tarea_id),
    },
    data: {
      titulo,
      descripcion,
      estado,
      fecha_limite,
    },
  });

  res.json({ Tarea: "La tarea ha sido actualizada con exito" });
};

export const eliminarTarea = async (req, res) => {
  const { tarea_id } = req.params;

  await prisma.tareas.delete({
    where: {
      tarea_id: parseInt(tarea_id),
    },
  });

  res.json({ Tarea: "Tarea eliminada con exito" });
};

export const obtenerTareas = async (req, res) => {
  const { usuario_id } = req.payload;

  const tareas = await prisma.tareas.findMany({
    where: {
      tarea_usuario_id: parseInt(usuario_id),
    },
  });

  res.json(tareas);
};
