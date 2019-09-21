import { createConnection } from 'typeorm';
import { listenApp } from './app';
import config from 'config';

const database = config.get('database');

createConnection({...database})
  .then((): void => {
    listenApp();
    console.log(`> Database connection to ${database.host}`);
  })
  .catch((error: string): void => {
    console.log(`> Error connection to database ${error}`);
  });
