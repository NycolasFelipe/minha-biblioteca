import { Model } from "sequelize";
import ErrorMessage from "src/errors/ErrorMessage";

// Bibliotecas externas
import jwt, { JwtPayload } from "jsonwebtoken";
import * as dotenv from 'dotenv';
import nodemailer from "nodemailer";

// Repositories
import ClienteRepository from "src/repositories/ClienteRepository";

// Services
import ClienteService from "./ClienteService";

// Util
import compareHashPassword from "src/util/compareHashPassword";

// Carregar variáveis ​​de ambiente
dotenv.config();

// Recuperar variáveis ​​de ambiente
const SECRET = process.env.SECRET as string;
const NODEMAILER_EMAIL = process.env.NODEMAILER_EMAIL as string;
const NODEMAILER_PASSWORD = process.env.NODEMAILER_PASSWORD as string;

// Validar variáveis ​​de ambiente
if (!SECRET || !NODEMAILER_EMAIL || !NODEMAILER_PASSWORD) {
  throw new Error("Uma ou mais variáveis de ambiente de banco de dados necessárias estão faltando");
}

class AuthService {
  /** Autentica um usuário com email e senha, retornando um token JWT em caso de sucesso */
  static async login(email: string, password: string) {
    const cliente = await ClienteRepository.getClientePrivate(email);
    // Verificação de existência
    if (!cliente) {
      throw new ErrorMessage("Email ou senha incorreto(s).", 401);
    }
    // Valida a senha informada
    const isPasswordValid = compareHashPassword(password, cliente.senha).success;
    if (!isPasswordValid) {
      throw new ErrorMessage("Email ou senha incorreto(s).", 401);
    }
    // Gera token do usuário
    const payload = await ClienteService.getCliente(cliente.email);
    return this.generateToken(payload);
  }

  /** Gera um token JWT com payload formatado */
  static async generateToken(payload: any) {
    const plainPayload = payload instanceof Model ? payload.toJSON() : payload;
    return jwt.sign(plainPayload, SECRET, { expiresIn: "1h" });
  }

  /** Envia link de recuperação de senha para o email informado */
  static async forgotPassword(email: string) {
    // Constrói URL de redefinição com o token gerado
    const buildResetLink = (token: string) => {
      return `https://website/reset-password/${token}`;
    }

    // Gera template HTML do e-mail com link de redefinição
    const buildEmailTemplate = (resetLink: string) => {
      return `
          <h3>Olá,</h3>
          <p>Você solicitou a redefinição de sua senha.</p>
          <p>Clique no link abaixo para redefinir sua senha:</p>
          <a href="${resetLink}">${resetLink}</a>
          <p>Se você não solicitou essa redefinição, ignore este e-mail.</p>
        `;
    }

    // Configura e envia o e-mail usando nodemailer
    const sendEmail = async (options: { to: string, subject: string, html: string }) => {
      // Cria transporter SMTP para Gmail com credenciais do .env
      const transporter = nodemailer.createTransport({
        service: "gmail",
        auth: {
          user: NODEMAILER_EMAIL,
          pass: NODEMAILER_PASSWORD
        }
      });

      // Envia e-mail com configurações recebidas
      await transporter.sendMail({
        from: NODEMAILER_EMAIL,
        ...options
      });
    }

    // Busca cliente a partir do email
    const cliente = await ClienteService.getCliente(email);

    // Gera token JWT usando o id do cliente encontrado
    const token = await AuthService.generateToken({ id: cliente.id });

    // Constrói link completo para redirecionamento
    const resetLink = buildResetLink(token);

    // Envia e-mail com link de redefinição
    await sendEmail({
      to: email,
      subject: "Redefinição de Senha",  // Assunto do e-mail
      html: buildEmailTemplate(resetLink)  // Corpo HTML do e-mail
    });
  }

  /** Redefine a senha do usuário usando um token válido */
  static async resetPassword(token: string, newPassword: string) {
    // Decodifica e valida token JWT
    const decoded = jwt.verify(token, SECRET) as JwtPayload;

    // Redefine a senha
    await ClienteService.updateCliente(decoded.id.toString(), { senha: newPassword });
  }

  /** Valida a integridade e autenticidade de um token JWT */
  static async validateToken(token: string) {
    await new Promise<void>((resolve, reject) => {
      jwt.verify(token, SECRET, (err) => {
        err ? reject(err) : resolve();
      });
    });
  }

  /** Renova um token JWT gerando uma nova versão com tempo de expiração atualizado */
  static async renewToken(token: string) {
    const decoded = jwt.verify(token, SECRET) as JwtPayload;
    const payload = await ClienteService.getCliente(decoded.id.toString());
    return this.generateToken(payload);
  }
}

export default AuthService;