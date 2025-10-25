import { Router } from "express";
import { catchAsync } from "../utils/catchAync.js";
import { loginUsuario, logout, signUp } from "../auth/Auth.Controller.js";
import { crearUsuario} from "../controllers/Usuario.Controller.js";
import { refreshToken } from "../utils/token.utils.js";

const router = Router();

router.post("/login", catchAsync(loginUsuario));
router.post("/signup", catchAsync(signUp));
router.post("/logout", logout);
router.post("/refresh", refreshToken);

export default router;
