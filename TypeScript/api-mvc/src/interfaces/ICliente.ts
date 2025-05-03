interface IClienteBase {
  cpf_cnpj: string;
  nome: string;
  email: string;
}

interface IClienteCreate extends IClienteBase {
  id: string;
  senha: string;
  url_foto?: string;
}

interface IClienteUpdate extends Partial<IClienteBase> {
  senha?: string;
  url_foto?: string | null;
}

interface IClienteResponse extends IClienteBase {
  id: number;
  url_foto?: string | null;
}

interface IClienteResponsePrivate extends IClienteBase {
  id: number;
  senha: string;
  url_foto?: string | null;
}