import jwt from "jsonwebtoken";

export const verifyAuth = (req, res, next) => {
  const header = req.header("Authorization") || "";

  const token = header.split(" ")[1];

  if (!token)
    return res.status(401).json({ Token: "No hay token de verficacion" });

  const payload = jwt.verify(token, process.env.SECRET_ACCESS_KEY);

  req.payload = payload;
  next();
};
