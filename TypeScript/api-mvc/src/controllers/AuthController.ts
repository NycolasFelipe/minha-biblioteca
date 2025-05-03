import { NextFunction, Request, Response } from "express";

// Service
import AuthService from "src/services/AuthService";

class AuthController {
  /** Processa o login de um cliente e retorna um token JWT */
  static async login(req: Request, res: Response, next: NextFunction) {
    const { email, senha } = req.body;

    try {
      // Obtém o token com dados do usuário
      const token = await AuthService.login(email, senha);

      // Resposta de sucesso
      res.status(200).json(token);

    } catch (error) {
      next(error);
    }
  }

  /** Inicia o processo de recuperação de senha enviando e-mail com link de redefinição */
  static async forgotPassword(req: Request, res: Response, next: NextFunction) {
    const { email } = req.body;

    try {
      // Processa a solicitação
      await AuthService.forgotPassword(email);

      // Resposta de sucesso
      res.status(200).send({
        message: "E-mail de redefinição de senha enviado com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /** Redefine a senha do cliente usando um token válido */
  static async resetPassword(req: Request, res: Response, next: NextFunction) {
    const { token, newPassword } = req.body;

    try {
      // Processa a solicitação
      await AuthService.resetPassword(token, newPassword);

      // Resposta de sucesso
      res.status(200).send({
        message: "Senha redefinida com sucesso."
      });

    } catch (error) {
      next(error);
    }
  }

  /** Valida a autenticidade e integridade de um token JWT */
  static async validateToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;

    try {
      // Processa a validação do token
      await AuthService.validateToken(token);

      // Resposta de sucesso
      res.status(200).send({ message: "Token válido." });

    } catch (error) {
      next(error);
    }
  }

  /** Renova um token JWT gerando uma nova versão com expiração atualizada */
  static async renewToken(req: Request, res: Response, next: NextFunction) {
    const { token } = req.body;

    try {
      // Obtém o token com dados do usuário
      const newToken = await AuthService.renewToken(token);

      // Resposta de sucesso
      res.status(200).json(newToken);

    } catch (error) {
      next(error);
    }
  }
}

export default AuthController;