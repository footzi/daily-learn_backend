import 'reflect-metadata';
import { DataSource } from 'typeorm';
import Dictionaries from './entities/Dictionaries';
import Tokens from './entities/Tokens';
import User from './entities/User';
import Words from './entities/Words';
import { listenApp } from './app';
import CONFIG from './config';

const { DB_HOST, DB_PORT, DB_USER, DB_PASSWORD, DB_DATABASE } = CONFIG;

export const AppDataSource = new DataSource({
  type: 'postgres',
  host: DB_HOST,
  port: Number(DB_PORT),
  username: DB_USER,
  password: DB_PASSWORD,
  database: DB_DATABASE,
  entities: [Dictionaries, Tokens, User, Words],
  synchronize: true,
  logging: false,
});

AppDataSource.initialize()
  .then(() => {
    listenApp();
  })
  .catch((error) => console.log(error));
