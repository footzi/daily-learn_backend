import { createConnection } from 'typeorm';
import { database } from '../../server.config.json';

export const mockUser = {
  id: 1,
  name: 'test',
  password: 'test',
  surname: 'test',
  access_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjoxNTY5MDczODk2LCJleHAiOjE1NjkwNzM4OTZ9.tPRdSvm8gEJpVoaqg_29fBUfqHdmxQavQyOqrSOC07M',
  refresh_token:
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwia2V5IjoiM2tPb3JhVGk2enZNTGhHR2x1Z1RLMTkxNFFwZUFlOUIiLCJpYXQiOjE1NjkwNzM4OTYsImV4cCI6MTU3MTY2NTg5Nn0.ErkWylDBKtf5QrOnFz0AgeB_dGC6-mtHLQLTvp2oL9Y'
};

export const dbConnection = () => {
  let connection = '';

  beforeAll(async () => {
    connection = await createConnection(database);
  });

  afterAll(async () => {
    connection.close();
  });
};
