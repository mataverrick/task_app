import jwt from "jsonwebtoken";
import dotenv from "dotenv";

dotenv.config();

export const createToken = ({ usuario_id, usuario_rol_id }) => {
  const payload = {
    usuario_id,
    usuario_rol_id,
  };

  const access_token = jwt.sign(payload, process.env.SECRET_ACCESS_KEY, {
    expiresIn: "15m",
  });

  const refresh_token = jwt.sign(payload, process.env.SECRET_REFRESH_KEY, {
    expiresIn: "2h",
  });

  return { access_token, refresh_token };
};

export const validateToken = (token) => {
  jwt.verify(token, process.env.SECRET_ACCESS_KEY);
};

export const refreshToken = (req, res) => {
  const refreshToken = req.cookies.refresh_token;

  if (!refreshToken)
    return res.status(401).json({ mensaje: "No hay token de refresco" });

  try {
    const decode = jwt.verify(refreshToken, process.env.SECRET_REFRESH_KEY);

    const newAccesToken = jwt.sign(
      { usuario_id: decode.usuario_id,
        usuario_rol_id : decode.usuario_rol_id
      },
      process.env.SECRET_ACCESS_KEY,
      {
        expiresIn: "15m",
      }
    );

    res.json({ accessToken: newAccesToken });
  } catch (error) {
    res.json({ error: error.message });
  }
};
