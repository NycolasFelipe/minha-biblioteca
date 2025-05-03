// Models
import Cliente from "src/models/ClienteModel";

// Validação de formato de email
import isEmail from "validator/lib/isEmail";

class ClienteRepository {
  /** Busca cliente por id ou email, excluindo a senha */
  static async getCliente(pk: string): Promise<IClienteResponse | null> {
    const isPkId = !isEmail(pk);
    return await Cliente.findOne({
      where: { [isPkId ? "id" : "email"]: pk },
      // include: [{
      //   model: Endereco,
      //   attributes: {
      //     exclude: ["id_cliente"]
      //   }
      // }],
      attributes: {
        exclude: ["senha"]
      }
    }) as unknown as IClienteResponse | null;
  }

  /** Busca cliente por id ou email, com finalidade de autenticação */
  static async getClientePrivate(pk: string): Promise<IClienteResponsePrivate | null> {
    const isPkId = !isEmail(pk);
    return await Cliente.findOne({
      where: { [isPkId ? "id" : "email"]: pk }
    }) as unknown as IClienteResponsePrivate | null;
  }

  /** Lista todos os clientes cadastrados */
  static async getClientes(): Promise<IClienteResponse[]> {
    return await Cliente.findAll({
      // include: [{
      //   model: Endereco,
      //   attributes: {
      //     exclude: ["id_cliente"]
      //   }
      // }],
      attributes: {
        exclude: ["senha"]
      }
    }) as unknown as IClienteResponse[];
  }

  /** Cria novo cliente com hash de senha */
  static async createCliente(data: IClienteCreate): Promise<IClienteResponse | null> {
    return await Cliente.create(
      { ...data }
    ) as unknown as IClienteResponse | null;
  }

  /** Atualiza dados do cliente (incluindo senha) */
  static async updateCliente(id: string, args: IClienteUpdate): Promise<number> {
    const [affectedRows] = await Cliente.update(
      { ...args },
      { where: { id } }
    );
    return affectedRows;
  }

  /** Remove cliente */
  static async deleteCliente(id: string): Promise<number> {
    return await Cliente.destroy({
      where: { id }
    });
  }
}

export default ClienteRepository;