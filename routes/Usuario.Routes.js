import { Router } from "express";
import { getUser } from "../controllers/Usuario.Controller.js";

const router = Router();



router.get("/",getUser)


export default router