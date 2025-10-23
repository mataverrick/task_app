import expres from "express";
import dotenv from "dotenv";
import { postRol } from "./controllers/Rol.Controller.js";
dotenv.config();

const app = expres();
const PORT = process.env.PORT || 3000;
app.use(expres.json());

app.post("/", postRol);

app.listen(PORT, () => {
  console.log(`Listen on port ${PORT}`);
});
