import expres from "express";
import cookieParser from "cookie-parser";
import dotenv from "dotenv";
import cors from "cors";
import { postUsuario } from "./controllers/Usuario.Controller.js";
import { verifyAuth } from "./middlewares/VerifyToken.middleware.js";
import { loginUsuario, logout } from "./auth/Auth.Controller.js";
import { refreshToken } from "./utils/token.utils.js";
import { catchAsync } from "./utils/catchAync.js";

dotenv.config();

const app = expres();
const PORT = process.env.PORT || 3000;
app.use(cors());
app.use(expres.json());
app.use(cookieParser());

// app.post("/", postRol);
//auth
app.post("/login", catchAsync(loginUsuario));
app.post("/signup", catchAsync(postUsuario));
app.post("/logout", catchAsync(logout));
app.post("/refresh", refreshToken);

app.use("/home", verifyAuth);

// middleware de errores
app.use((err, req, res, next) => {


  res.status(500).json({ error: err.message });
});

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
