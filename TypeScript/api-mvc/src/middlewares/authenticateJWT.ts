import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';
import jwt from "jsonwebtoken";

// Carregar variáveis ​​de ambiente
dotenv.config();

// Recuperar variáveis ​​de ambiente
const ADMIN_FIXED_TOKEN = process.env.ADMIN_FIXED_TOKEN;
const SECRET = process.env.SECRET;

// Validar variáveis ​​de ambiente
if (!ADMIN_FIXED_TOKEN || !SECRET) {
  throw new Error("Variáveis de ambiente necessárias não encontradas");
}

const authenticateJWT = (req: Request, res: Response, next: NextFunction): void => {
  // Primeiro verifica o token fixo da equipe admin
  const fixedToken = req.headers["x-admin-token"];

  // Se o token fixo foi enviado e é válido, permite acesso
  if (fixedToken && fixedToken === ADMIN_FIXED_TOKEN) {
    return next(); // Acesso concedido via token fixo
  }

  // Se não usar token fixo, verifica o JWT normal
  const authHeader = req.headers.authorization;
  const token = authHeader && authHeader.split(" ")[1]; // Extrai o Bearer token

  if (!token) {
    res.status(401).json({ message: "Token não fornecido ou formato inválido" });
    return; 
  }

  // Verifica o token JWT
  jwt.verify(token, SECRET, (error, payload) => {
    if (error) {
      if (error.name === "JsonWebTokenError") {
        res.status(401).json({ message: "Erro na validação do token" });
      }
      else if (error.name === "TokenExpiredError") {
        res.status(401).json({ message: "Token expirado" });
      }
      else if (error.message === "Invalid token") {
        res.status(401).json({ message: "Token inválido" });
      }
      return;
    }

    // Injeta dados do payload na request
    req.payload = payload as jwt.JwtPayload;

    // Acesso concedido via JWT
    next();
  });
};

export default authenticateJWT;
