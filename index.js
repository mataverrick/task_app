import expres from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import AuthRouter from "./routes/Auth.Routes.js";
import { verifyAuth } from "./middlewares/VerifyToken.middleware.js";
import UsuarioRoutes from "./routes/Usuario.Routes.js";
import TareaRoutes from "./routes/Tarea.Routes.js";

dotenv.config();

const app = expres();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(expres.json());
app.use(cookieParser());

//auth
app.use("/auth", AuthRouter);

//obtener datos del usuario pagina principal
app.use("/home", verifyAuth, UsuarioRoutes);
app.use("/tarea",verifyAuth,TareaRoutes);

// middleware de errores
app.use((err, req, res, next) => {
  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
