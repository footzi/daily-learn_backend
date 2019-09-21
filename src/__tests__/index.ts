import { createConnection } from 'typeorm';
import config from 'config';

export const mockUser = {
  id: 61,
  name: 'test',
  password: 'test',
  surname: 'test',
  access_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImlhdCI6MTU2ODU2MDgwMiwiZXhwIjoxNTY4NTYwODAyfQ.LCEa-zB5QifXZ3VVCFDS97X0ls0-zKkB6WytqwIM5w0",
  refresh_token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6NjEsImtleSI6InU4bEZZNkxiTFFGMDJBT1ZtZ2ZQckEyNDk5TWRxRE1HIiwiaWF0IjoxNTY4NTYwODAyLCJleHAiOjE1NzExNTI4MDJ9.lD7dPKIXS4JLwGwkwUWmGSyUev3HSR7_D9SsX_MPyns"
};

export const dbConnection = () => {
  const database = config.get('database');
  let connection = '';

  beforeAll(async () => {
    connection = await createConnection(database);
  });

  afterAll(async () => {
    connection.close();
  });
};