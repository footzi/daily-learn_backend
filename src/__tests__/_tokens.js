import request from 'supertest';
import randomstring from 'randomstring';
import app from '../app';
import mockUser from './user';

describe('Токенизация', () => {
  let loginedUser = '';

  beforeAll(async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('login', randomstring.generate())
      .field('password', randomstring.generate());

    loginedUser = result.body.data.user;
  });

  // Проверка прав
  it('При заходе на защищеный маршрут с верным access токеном получаем 200', async () => {
    const result = await request(app).get('/screens/home').set('Authorization', `Bearer ${loginedUser.access_token}`);

    expect(result.statusCode).toEqual(200);
  });

  it('При заходе на защищеный маршрут с просроченым access токеном получаем 401 и объект ошибки', async () => {
    const result = await request(app)
      .get('/screens/home')
      .set('Authorization', `Bearer ${mockUser.expire_access_token}`);
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(401);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При заходе на защищеный маршрут с отсутствующим токеном получаем 403 и объект ошибки', async () => {
    const result = await request(app).get('/screens/home');
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При заходе на защищеный маршрут с неверным токеном получаем 401 и объект ошибки', async () => {
    const result = await request(app).get('/screens/home').set('Authorization', `Bearer ${randomstring.generate()}`);
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(401);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  // Refresh
  it('При рефреше с верным рефреш токеном получаем 200 и набор новых токенов', async () => {
    const result = await request(app).post('/api/refresh').set('Authorization', `Bearer ${loginedUser.refresh_token}`);
    const { user } = result.body.data;

    expect(result.statusCode).toEqual(200);
    expect(user).toHaveProperty('access_token');
    expect(user).toHaveProperty('refresh_token');
    expect(user).toHaveProperty('expire');
  });

  it('При рефреше с отсутствующим рефреш токеном получаем 403 и объект ошибки', async () => {
    const result = await request(app).post('/api/refresh');
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При рефреше с неверным рефреш токеном получаем 401 и объект ошибки', async () => {
    const result = await request(app).post('/api/refresh').set('Authorization', `Bearer ${randomstring.generate()}`);
    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(401);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });
});
