import { createConnection } from 'typeorm';
import { listenApp } from './app';
import { database } from '../server.config.json';

// @ts-ignore
createConnection(database)
  .then((): void => {
    listenApp();
    // @ts-ignore
    console.log(`> Database connection to ${database.host}`);
  })
  .catch((error: string): void => {
    console.log(`> Error connection to database ${error}`);
  });
