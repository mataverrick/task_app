-- CreateEnum
CREATE TYPE "EstadoTareas" AS ENUM ('pendiente', 'progreso', 'terminado');

-- CreateEnum
CREATE TYPE "RolUsuario" AS ENUM ('admin', 'usuario');

-- CreateTable
CREATE TABLE "Usuarios" (
    "usuario_id" SERIAL NOT NULL,
    "nombre" VARCHAR(100) NOT NULL,
    "email" VARCHAR(150) NOT NULL,
    "password" VARCHAR(100) NOT NULL,
    "usuario_rol_id" INTEGER NOT NULL,

    CONSTRAINT "Usuarios_pkey" PRIMARY KEY ("usuario_id")
);

-- CreateTable
CREATE TABLE "Roles" (
    "rol_id" SERIAL NOT NULL,
    "rol_nombre" "RolUsuario" NOT NULL,

    CONSTRAINT "Roles_pkey" PRIMARY KEY ("rol_id")
);

-- CreateTable
CREATE TABLE "Tareas" (
    "tarea_id" SERIAL NOT NULL,
    "titulo" VARCHAR(100) NOT NULL,
    "descripcion" VARCHAR(300),
    "fecha_de_creacion" DATE NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "estado" "EstadoTareas" NOT NULL DEFAULT 'pendiente',
    "fecha_limite" DATE,
    "tarea_usuario_id" INTEGER NOT NULL,

    CONSTRAINT "Tareas_pkey" PRIMARY KEY ("tarea_id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Usuarios_email_key" ON "Usuarios"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Roles_rol_nombre_key" ON "Roles"("rol_nombre");

-- AddForeignKey
ALTER TABLE "Usuarios" ADD CONSTRAINT "Usuarios_usuario_rol_id_fkey" FOREIGN KEY ("usuario_rol_id") REFERENCES "Roles"("rol_id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tareas" ADD CONSTRAINT "Tareas_tarea_usuario_id_fkey" FOREIGN KEY ("tarea_usuario_id") REFERENCES "Usuarios"("usuario_id") ON DELETE CASCADE ON UPDATE CASCADE;
