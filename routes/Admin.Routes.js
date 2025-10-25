import { Router } from "express";
import { catchAsync } from "../utils/catchAync.js";
import {
  crearUsuario,
  editarUsuario,
  eliminarUsuario,
  obtenerUsarios,
} from "../controllers/Usuario.Controller.js";

const router = Router();

router.post("/crear/usuario", catchAsync(crearUsuario));
router.get("/obtener/usuarios", catchAsync(obtenerUsarios));
router.delete("/eliminar/usuario/:usuario_id", catchAsync(eliminarUsuario));
router.put("/editar/usuario/:usuario_id", catchAsync(editarUsuario));

export default router;
