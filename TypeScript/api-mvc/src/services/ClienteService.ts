import ErrorMessage from "src/errors/ErrorMessage";

// Repositories
import ClienteRepository from "src/repositories/ClienteRepository";

class ClienteService {
  // Obtém um cliente específico pelo identificador único (ID ou email)
  static async getCliente(uniquePk: string) {
    // Busca no repositório usando o identificador único
    const cliente = await ClienteRepository.getCliente(uniquePk);
    // Verificação de existência
    if (!cliente) {
      throw new ErrorMessage("Cliente não encontrado.", 404);
    }
    return cliente;
  }

  // Obtém todos os clientes
  static async getClientes() {
    return await ClienteRepository.getClientes();
  }

  // Cria um novo cliente
  static async createCliente(args: IClienteCreate) {
    const cliente = await ClienteRepository.createCliente({ ...args });
    // Verificação de cadastro
    if (!cliente) {
      throw new ErrorMessage("Erro ao cadastrar cliente.", 422);
    }
    return cliente;
  }

  // Remove um cliente
  static async deleteCliente(id: string) {
    const registros = await ClienteRepository.deleteCliente(id);
    // Verificação de remoção do cliente
    if (registros === 0) {
      throw new ErrorMessage("Não foi possível encontrar um cliente com esse id.", 404);
    }
  }

  static async updateCliente(id: string, args: IClienteUpdate) {
    // Verifica existência do cliente
    await ClienteService.getCliente(id);

    // Verificação de atualização do cliente
    const affectedRows = await ClienteRepository.updateCliente(id, args);
    if (affectedRows === 0) {
      throw new ErrorMessage("Erro ao atualizar cliente.", 422);
    }
  }
}

export default ClienteService;