import { NextFunction, Request, Response } from "express";
import ErrorMessage from "src/errors/ErrorMessage";

// Service
import ClienteService from "src/services/ClienteService";
const {
  getCliente,
  getClientes,
  createCliente,
  deleteCliente,
  updateCliente
} = ClienteService;


class ClienteController {
  // Obtém detalhes de um cliente específico
  static async getCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
    // Extrai a chave primária (id ou email) do cliente dos parâmetros da rota
    const { id: uniquePk } = req.params;

    try {
      // Busca os dados do cliente
      const cliente = await getCliente(uniquePk);

      // Resposta de sucesso
      res.status(200).json(cliente);

    } catch (error) {
      next(error);
    }
  }

  // Obtém todos os clientes
  static async getClientes(req: Request, res: Response, next: NextFunction): Promise<void> {
    try {
      // Busca todos os clientes
      const clientes = await getClientes();

      // Resposta de sucesso
      res.status(200).json(clientes);

    } catch (error) {
      next(error);
    }
  }

  // Cria um novo cliente
  static async createCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id, nome, email, senha, cpf_cnpj, url_foto } = req.body;

    try {
      // Cria o cliente na base de dados
      const cliente = await createCliente({ id, nome, email, senha, cpf_cnpj, url_foto });

      // Resposta de sucesso
      res.status(201).json(cliente);

    } catch (error) {
      next(error);
    }
  }

  // Remove um cliente
  static async deleteCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;

    try {
      // Remove um cliente da base de dados
      await deleteCliente(id);

      // Resposta de sucesso
      res.status(200).json({ message: "Cliente removido com sucesso." });

    } catch (error) {
      next(error);
    }
  }

  // Atualiza um cliente
  static async updateCliente(req: Request, res: Response, next: NextFunction): Promise<void> {
    const { id } = req.params;
    const camposDisponiveis = ['nome', 'email', 'senha', 'cpf_cnpj', 'url_foto'];

    try {
      // Filtra apenas os campos permitidos que foram enviados no body
      const camposAtualizados: Record<string, any> = {};

      for (const campo of camposDisponiveis) {
        if (req.body[campo] !== undefined) {
          camposAtualizados[campo] = req.body[campo];
        }
      }

      // Verifica se há campos para atualizar
      if (Object.keys(camposAtualizados).length === 0) {
        throw new ErrorMessage("Nenhum campo válido para atualização foi enviado.", 400);
      }

      // Atualiza os dados de um cliente
      await updateCliente(id, camposAtualizados);

      // Resposta de sucesso
      res.status(200).json({ message: "Cliente atualizado com sucesso." });

    } catch (error) {
      next(error);
    }
  }
}

export default ClienteController;