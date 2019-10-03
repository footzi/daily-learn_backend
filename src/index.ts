import { createConnection } from 'typeorm';
import { listenApp } from './app';

const CONFIG = require('../server.config.json');

createConnection(CONFIG.database)
  .then((): void => {
    listenApp();
    console.log(`> Database connection to ${CONFIG.database.host}`);
  })
  .catch((error: string): void => {
    console.log(`> Error connection to database ${error}`);
  });
