// Importação de módulos principais e dependências
import express from "express";
import cors from "cors";
import morgan from "morgan";
import helmet from "helmet";
import sequelize from "src/config/sequelize";

// Importação das rotas da aplicação
import cliente from "src/routes/ClienteRoute";

// Importação dos middlewares
import errorHandlerMiddleware from "./middlewares/errorHandlerMiddleware";

// Criação da instância do Express
const app = express();

// Configuração de middlewares globais
app.use(morgan("tiny"));
app.use(cors());
app.use(helmet());
app.use(express.json());

// Rotas da aplicação
app.use(cliente);

// Middlewares
app.use(errorHandlerMiddleware);

// Sincronização com o banco de dados e inicialização do servidor
sequelize.sync()
  .then(() => console.log("Conexão estabelecida com sucesso"))
  .catch(error => console.log("Falha na sincronização", error));

export default app;