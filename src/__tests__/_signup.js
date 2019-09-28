import request from 'supertest';
import randomstring from 'randomstring';
import app from '../app';
import mockUser from './user';

describe('Регистрация', () => {
  it('При успехе получаем 200, id пользователя и токены', async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('login', randomstring.generate())
      .field('email', randomstring.generate())
      .field('password', randomstring.generate());

    const { user } = result.body.data;

    expect(result.statusCode).toEqual(200);
    expect(user).toHaveProperty('id');
    expect(user).toHaveProperty('access_token');
    expect(user).toHaveProperty('refresh_token');
  });

  it('С cуществующим login получаем 403, и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('login', mockUser.login)
      .field('password', mockUser.password);
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });
});
