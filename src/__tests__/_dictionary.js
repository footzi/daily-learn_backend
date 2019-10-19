import request from 'supertest';
import randomstring from 'randomstring';
import app from '../app';

describe('Работа со словарями', () => {
  const dict_name = randomstring.generate();
  let loginedUser = '';

  beforeAll(async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('login', randomstring.generate())
      .field('password', randomstring.generate());

    loginedUser = result.body.data.user;
  });

  it('При создании нового словаря при успехе получаем 200, success true', async () => {
    const result = await request(app)
      .post('/api/dictionary/create')
      .set('Authorization', `Bearer ${loginedUser.access_token}`)
      .field('name', dict_name);

    const { success } = result.body.data;

    expect(result.statusCode).toEqual(200);
    expect(success).toBeTruthy();
  });

  it('При создании нового словаря без поля name получаем 403 и объект ошибки', async () => {
    const result = await request(app)
      .post('/api/dictionary/create')
      .set('Authorization', `Bearer ${loginedUser.access_token}`);

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При создании нового словаря с cуществующим именем получаем 403 и сообщение об ошибке', async () => {
    const result = await request(app)
      .post('/api/dictionary/create')
      .set('Authorization', `Bearer ${loginedUser.access_token}`)
      .field('name', dict_name);

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При получении всех словарей получаем 200 и массив dictionaries c массивом words', async () => {
    const result = await request(app)
      .get('/api/dictionary/getall')
      .set('Authorization', `Bearer ${loginedUser.access_token}`);

    const { dictionaries } = result.body.data;

    expect(result.statusCode).toEqual(200);
    expect(dictionaries).toBeTruthy();
    expect(dictionaries[0].words).toBeTruthy();
  });
});
