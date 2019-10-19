import request from 'supertest';
import randomstring from 'randomstring';
import app from '../app';

describe('Главный экран', () => {
  let loginedUser = '';

  beforeAll(async () => {
    const result = await request(app)
      .post('/api/signup')
      .field('login', randomstring.generate())
      .field('password', randomstring.generate());

    loginedUser = result.body.data.user;
  });

  it('При получении данных получаем 200, и массив dictionaries', async () => {
    const result = await request(app)
      .get('/screens/home')
      .set('Authorization', `Bearer ${loginedUser.access_token}`);

    const { dictionaries } = result.body.data;

    expect(result.statusCode).toEqual(200);
    expect(dictionaries).toBeTruthy();
  });
});
