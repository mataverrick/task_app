import expres from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import { postRol } from "./controllers/Rol.Controller.js";
import { postUsuario } from "./controllers/Usuario.Controller.js";
import UsuarioRoutes from "./routes/Usuario.Routes.js";
import { verifyAuth } from "./middlewares/VerifyToken.middleware.js";
import { loginUsuario, logout } from "./auth/Auth.Controller.js";
import { refreshToken } from "./utils/token.utils.js";

dotenv.config();

const app = expres();
const PORT = process.env.PORT || 3000;
app.use(expres.json());
app.use(cookieParser());

// app.post("/", postRol);
//auth
app.post("/login", loginUsuario);
app.post("/signup", postUsuario);
app.post("/logout",logout)
app.post("/refresh", refreshToken);


app.use("/home", verifyAuth);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
