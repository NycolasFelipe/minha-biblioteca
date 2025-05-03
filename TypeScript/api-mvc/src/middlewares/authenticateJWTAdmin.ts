import { Request, Response, NextFunction } from "express";
import dotenv from 'dotenv';

// Carregar variáveis ​​de ambiente
dotenv.config();

// Recuperar variáveis ​​de ambiente
const ADMIN_FIXED_TOKEN = process.env.ADMIN_FIXED_TOKEN;
const SECRET = process.env.SECRET;

// Validar variáveis ​​de ambiente
if (!ADMIN_FIXED_TOKEN || !SECRET) {
  throw new Error("Variáveis de ambiente necessárias não encontradas");
}

const authenticateJWTAdmin = (req: Request, res: Response, next: NextFunction): void => {
  // Verifica o token fixo da equipe admin
  const fixedToken = req.headers["x-admin-token"];

  // Se o token fixo foi enviado e é válido, permite acesso
  if (fixedToken && fixedToken === ADMIN_FIXED_TOKEN) {
    return next(); // Acesso concedido via token fixo
  }
  
  // Token inválido
  res.status(401).json({ message: "Token de administrador inválido" });
  return;
};

export default authenticateJWTAdmin;
