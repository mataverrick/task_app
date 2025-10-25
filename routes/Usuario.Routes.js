import { Router } from "express";
import { obtenerUsuario } from "../controllers/Usuario.Controller.js";
import { catchAsync } from "../utils/catchAync.js";

const router = Router();

router.get("/dashboard", catchAsync(obtenerUsuario));

export default router;
