import { Router } from "express";
import {
  actualizarTarea,
  crearTarea,
  eliminarTarea,
  obtenerTareas,
} from "../controllers/Tarea.Controller.js";
import { catchAsync } from "../utils/catchAync.js";

const router = Router();

router.post("/crear", catchAsync(crearTarea));
router.put("/actualizar/:tarea_id", catchAsync(actualizarTarea));
router.delete("/eliminar/:tarea_id", catchAsync(eliminarTarea));
router.get("/obtener", catchAsync(obtenerTareas));
export default router;
