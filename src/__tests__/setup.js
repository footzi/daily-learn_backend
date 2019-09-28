import { createConnection } from 'typeorm';
import { database } from '../../server.config.json';

let connection = '';

jest.setTimeout(30000);

beforeAll(async () => {
  connection = await createConnection(database);
});

afterAll(async () => {
  connection.close();
});
