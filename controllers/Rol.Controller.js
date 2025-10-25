import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();

export const crearRol = async (req, res) => {
  try {
    const { rol_nombre } = req.body;

    const rol = await prisma.roles.create({
        data:{
            rol_nombre
        }
    })

    res.json({rol}).status(200)
  } catch (error) {
    res.json({error:error.message})
  }
};
