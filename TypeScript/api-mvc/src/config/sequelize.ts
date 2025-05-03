import { Sequelize } from 'sequelize-typescript';
import * as dotenv from 'dotenv';

// Modelos
import models from '../models/index';

// Carregar variáveis ​​de ambiente
dotenv.config({ path: process.env.NODE_ENV === 'test' ? ".env.test" : ".env" })

// Recuperar variáveis ​​de ambiente
const DB_NAME = process.env.DB_NAME;
const DB_USER = process.env.DB_USER;
const DB_PASSWORD = process.env.DB_PASSWORD;
const DB_HOST = process.env.DB_HOST;
const DB_PORT = Number(process.env.DB_PORT);

// Validar variáveis ​​de ambiente
if (!DB_NAME || !DB_USER || !DB_PASSWORD || !DB_HOST || !DB_PORT) {
  throw new Error("Uma ou mais variáveis de ambiente de banco de dados necessárias estão faltando");
}

// Cria uma instância do Sequelize com a configuração adequada
const sequelize = new Sequelize({
  logging: process.env.NODE_ENV === 'test' ? false : console.log,
  database: DB_NAME,
  username: DB_USER,
  password: DB_PASSWORD,
  host: DB_HOST,
  dialect: "mysql",
  models,
  port: DB_PORT,
});

export default sequelize;