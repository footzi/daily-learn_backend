import request from 'supertest';
import randomstring from 'randomstring';
import app from '../app';
import { dbConnection, mockUser } from './index';

describe('Регистрация', () => {
  dbConnection();

  it('При успехе получаем 200, id пользователя и токены', async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('name', randomstring.generate())
      .field('surname', randomstring.generate())
      .field('password', randomstring.generate());

    const { user } = result.body;

    expect(result.statusCode).toEqual(200);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('access_token');
    expect(user).toHaveProperty('refresh_token');
  });

  it('С cуществующим name получаем 403, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('name', mockUser.name)
      .field('password', mockUser.password);
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(500);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });
});
