import { NextFunction, Request, Response } from "express";
import IRequestError from "src/interfaces/IRequestError";
import {
  DatabaseError,
  ForeignKeyConstraintError,
  UniqueConstraintError,
  ValidationError,
  ValidationErrorItem
} from "sequelize";

/** Tipo para funções de tratamento de erro que verificam e processam erros específicos */
type ErrorHandler = (err: any, req: Request) => IRequestError | null;

/** Lista de handlers de erro em ordem de prioridade de execução */
const errorHandlers: ErrorHandler[] = [
  // Handlers para erros específicos do MySQL/Sequelize
  handleDuplicateEntryError,
  handleForeignKeyConstraintError,
  handleUniqueConstraintError,
  handleDataTooLongError,
  handleSequelizeValidationError,

  // Handlers para erros customizados
  handleCustomError,
  handleEmptyRequestBody,
  handleJwtError,

  // Handler para erro genérico
  handleGenericError
];

/** Middleware principal de tratamento de erros */
const errorHandlerMiddleware = (
  err: Error | IRequestError | any,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const error = handleError(err, req);
  logError(err);
  sendErrorResponse(res, error);
};

/** Processa o erro através dos handlers */
function handleError(err: any, req: Request): IRequestError {
  // Itera pela lista de handlers até encontrar o primeiro que processe o erro
  for (const handler of errorHandlers) {
    const error = handler(err, req);
    if (error) return error;
  }
  return { status: 500, message: "Erro interno do servidor" };
}

/** Registra o erro no console */
function logError(err: any): void {
  console.error('Erro:', err);
}

/** Envia resposta de erro formatada para o cliente */
function sendErrorResponse(res: Response, error: IRequestError): void {
  res.status(error.status).json({ message: error.message });
}


// Implementações específicas dos handlers

/** Trata erros de entrada duplicada do MySQL (ER_DUP_ENTRY) */
function handleDuplicateEntryError(err: any): IRequestError | null {
  if (err.code === 'ER_DUP_ENTRY') {
    // Extrai o nome do campo duplicado da mensagem de erro
    const duplicatedField = err.message.match(/key '(.+?)'/)?.[1] || 'campo';
    return { status: 409, message: `Já existe um registro com este ${duplicatedField}.` };
  }
  return null;
}

/** Trata erros de chave estrangeira do Sequelize */
function handleForeignKeyConstraintError(err: any): IRequestError | null {
  if (err instanceof ForeignKeyConstraintError) {
    // Obtém o primeiro campo da chave estrangeira encontrada
    const foreignKey = err.fields?.[0] || 'campo';
    return { status: 409, message: `Falha ao encontrar registro com a chave estrangeira ${foreignKey}.` };
  }
  return null;
}

/** Trata erros de constraint única do Sequelize */
function handleUniqueConstraintError(err: any): IRequestError | null {
  if (err instanceof UniqueConstraintError) {
    // Obtém o caminho do primeiro erro de validação
    const duplicatedField = err.errors[0]?.path || 'campo';
    return { status: 409, message: `A chave ${duplicatedField} já está em uso.` };
  }
  return null;
}

/** Trata erros de dados muito longos (ER_DATA_TOO_LONG) */
function handleDataTooLongError(err: any): IRequestError | null {
  if (err instanceof DatabaseError && /Data too long|Out of range/.test(err.message)) {
    // Extrai o nome do campo do texto da mensagem
    const tooLongField = err.message.split("'")[1];
    return { status: 409, message: `O campo ${tooLongField} excede o número de caracteres permitidos.` };
  }
  return null;
}

/** Trata erros de validação do Sequelize */
function handleSequelizeValidationError(err: any): IRequestError | null {
  if (err instanceof ValidationError && err.errors?.length > 0) {
    return getValidationError(err.errors[0]);
  }
  return null;
}

/** Mapeia erros de validação para mensagens legíveis */
function getValidationError(error: ValidationErrorItem): IRequestError {
  // Mapeamento de validadores para mensagens customizadas
  const messages: Record<string, string> = {
    is_null: `O campo ${error.path} não pode ser nulo.`,
    notEmpty: `O campo ${error.path} não pode ser vazio.`,
    isAlpha: `O campo ${error.path} deve conter somente letras.`,
    isEmail: `O campo ${error.path} deve ser um email válido.`,
    isNumeric: `O campo ${error.path} deve conter somente números.`
  };

  return {
    status: 400,
    message: messages[error.validatorKey!] || error.message || "Erro de validação"
  };
}

/** Trata erros customizados que implementam a interface IRequestError */
function handleCustomError(err: any): IRequestError | null {
  if ('status' in err && 'message' in err) {
    return err as IRequestError;
  }
  return null;
}

/** Trata requisições POST com corpo vazio */
function handleEmptyRequestBody(_: any, req: Request): IRequestError | null {
  if (req.method === "POST" && (req.body === undefined || Object.keys(req.body).length === 0)) {
    return { status: 400, message: "O corpo da requisição está ausente ou vazio." };
  }
  return null;
}

/** Trata erros relacionados a JWT */
function handleJwtError(err: any): IRequestError | null {
  if (err.name === 'TokenExpiredError' || err.name === 'JsonWebTokenError') {
    return { status: 401, message: "Token inválido ou expirado." };
  }
  return null;
}

/** Handler genérico para erros não tratados */
function handleGenericError(): IRequestError {
  return { status: 500, message: "Erro interno do servidor" };
}

export default errorHandlerMiddleware;