import request from 'supertest';
import randomstring from 'randomstring';
import app from '../app';
import mockUser from './user';

describe('Разлогирование', () => {
  let loginedUser = '';

  beforeAll(async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('login', randomstring.generate())
      .field('password', randomstring.generate());

    loginedUser = result.body.data.user;
  });

  it('При успешном разлогировании получаем 200, и success: true', async () => {
    const result = await request(app)
      .post('/api/signout')
      .set('Authorization', `Bearer ${loginedUser.access_token}`);

    const { success } = result.body.data;

    expect(result.statusCode).toEqual(200);
    expect(success).toBeTruthy();
  });

  it('При разлогировании с отсутствующем токеном токеном получаем 403 и объект ошибки', async () => {
    const result = await request(app).post('/api/signout');

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При разлогировании с неверным токеном получаем 401 и объект ошибки', async () => {
    const result = await request(app)
      .post('/api/signout')
      .set('Authorization', `Bearer ${randomstring.generate()}`);
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(401);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });
});
