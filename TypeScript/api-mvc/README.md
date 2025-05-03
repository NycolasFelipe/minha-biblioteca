# Documentação do Projeto API-MVC  

## Introdução  
Este projeto é uma **API RESTful** desenvolvida em Node.js com TypeScript, seguindo o padrão **MVC (Model-View-Controller)**. Seu objetivo principal é fornecer endpoints para:  
- **Autenticação de usuários** via JWT (JSON Web Tokens), incluindo login, renovação de token e recuperação de senha.  
- **Gestão de clientes**, permitindo operações CRUD (Create, Read, Update, Delete) com validações e segurança.  
- Tratamento centralizado de erros e integração com banco de dados MySQL via Sequelize.  

A API é adequada para sistemas que requerem autenticação robusta e gestão de dados sensíveis, como aplicações de e-commerce ou plataformas de usuários.  


## Estrutura do Código  

### 1. **Configuração Geral**  
- **`config/sequelize.ts`**:  
  - Configura a conexão com o banco de dados MySQL usando o Sequelize.  
  - Carrega variáveis de ambiente (`.env`) e valida sua presença.  
  - Importa modelos do banco de dados para sincronização automática.  


### 2. **Camada de Controllers**  
Responsável por **receber requisições HTTP** e **delegar ações** para a camada de serviços.  
- **`controllers/AuthController.ts`**:  
  - Gerencia autenticação:  
    - `login`: Valida credenciais e retorna um token JWT.  
    - `forgotPassword`/`resetPassword`: Envia e-mail de recuperação e redefine senhas.  
    - `validateToken`/`renewToken`: Valida e renova tokens JWT.  
- **`controllers/ClienteController.ts`**:  
  - Gerencia operações CRUD para clientes:  
    - `getCliente`, `getClientes`: Busca clientes por ID, e-mail ou lista todos.  
    - `createCliente`, `updateCliente`, `deleteCliente`: Cria, atualiza ou remove clientes.  


### 3. **Camada de Serviços**  
Implementa **lógica de negócio** e interage com repositórios para acesso a dados.  
- **`services/AuthService.ts`**:  
  - Valida credenciais, gera tokens JWT e envia e-mails via nodemailer.  
  - Métodos: `login`, `generateToken`, `forgotPassword`, `resetPassword`.  
- **`services/ClienteService.ts`**:  
  - Valida dados antes de operações no banco e trata erros específicos.  


### 4. **Camada de Repositórios**  
Abstrai **operações de banco de dados** usando Sequelize.  
- **`repositories/ClienteRepository.ts`**:  
  - Métodos como `getCliente`, `createCliente`, `updateCliente` que interagem diretamente com o modelo `Cliente`.  


### 5. **Modelos**  
Define a estrutura das tabelas do banco de dados.  
- **`models/ClienteModel.ts`**:  
  - Modelo Sequelize para a tabela `cliente`, com campos como `id`, `senha` (hash), `cpf_cnpj`, `email`, etc.  
  - Hooks como `@AfterCreate` para remover a senha antes de retornar dados.  


### 6. **Middlewares**  
Intercepta requisições para **validações** e **tratamento de erros**.  
- **`authenticateJWT.ts`**:  
  - Verifica tokens JWT ou um token fixo de administrador (`x-admin-token`).  
- **`authenticateJWTAdmin.ts`**:  
  - Restringe acesso apenas a administradores via token fixo.  
- **`errorHandlerMiddleware.ts`**:  
  - Centraliza erros, categorizando-os (ex: duplicatas, validações) e retorna respostas padronizadas.  


### 7. **Rotas**  
Define os **endpoints da API** e associa middlewares.  
- **`routes/AuthRoute.ts`**:  
  - Endpoints: `/api/auth/login`, `/api/auth/forgot-password`, etc.  
- **`routes/ClienteRoute.ts`**:  
  - Endpoints protegidos por `authenticateJWTAdmin`: `/api/cliente`, `/api/cliente/:id`.  


### 8. **Utilitários e Tipos**  
- **`util/`**:  
  - `hashPassword`: Cria hash SHA-256 para senhas.  
  - `compareHashPassword`: Compara senhas com hash armazenado.  
  - `extractTokenId`: Extrai o ID do payload do JWT.  
- **`types/express/index.d.ts`**:  
  - Estende a interface `Request` do Express para incluir `payload` do JWT.  


### 9. **Interfaces**  
Define **tipos TypeScript** para estruturas de dados.  
- **`ICliente.ts`**: Tipos como `IClienteCreate`, `IClienteUpdate` para operações com clientes.  
- **`IRequestError.ts`**: Padroniza respostas de erro (`message`, `status`, `code`).  


### 10. **Configuração do Servidor**  
- **`app.ts`**:  
  - Configura o Express com middlewares globais (CORS, Helmet, JSON).  
  - Sincroniza o Sequelize com o banco de dados.  
- **`server.ts`**:  
  - Inicia o servidor na porta definida em `.env`.  


## Tecnologias Utilizadas  
- **Node.js** + **TypeScript**  
- **Express**: Framework para rotas e middlewares.  
- **Sequelize**: ORM para MySQL.  
- **JWT**: Autenticação via tokens.  
- **Nodemailer**: Envio de e-mails para recuperação de senha.  
- **Dotenv**: Gerenciamento de variáveis de ambiente.  


## Considerações Finais  
A estrutura do projeto prioriza:  
- **Separação de responsabilidades** (MVC).  
- **Segurança**: Hashing de senhas, tokens JWT e validações robustas.  
- **Manutenibilidade**: Tratamento centralizado de erros e tipagem estática.  

Para expandir a API, basta adicionar novos modelos, repositórios, serviços e controllers seguindo o padrão existente.