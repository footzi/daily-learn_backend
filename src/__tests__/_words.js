import request from 'supertest';
import randomstring from 'randomstring';
import app from '../app';

describe('Работа со словами', () => {
  let loginedUser = '';
  let dict_id = '';
  let word_id = '';

  beforeAll(async () => {
    // Регистрация пользователя
    const user = await request(app)
      .post('/api/signup')
      .field('login', randomstring.generate())
      .field('password', randomstring.generate());

    loginedUser = user.body.data.user;

    // Cоздание словаря
    await request(app)
      .post('/api/dictionary/create')
      .set('Authorization', `Bearer ${loginedUser.access_token}`)
      .field('name', randomstring.generate());

    // Получение словарей
    const result = await request(app)
      .get('/api/dictionary/getall')
      .set('Authorization', `Bearer ${loginedUser.access_token}`);

    const { dictionaries } = result.body.data;

    dict_id = dictionaries[0].id;
  });

  it('При cохранении нового cлова при успехе получаем 200, success true', async () => {
    const result = await request(app)
      .post('/api/words/create')
      .set('Authorization', `Bearer ${loginedUser.access_token}`)
      .field('ru', randomstring.generate())
      .field('en', randomstring.generate())
      .field('dictionary_id', dict_id);

    const { success } = result.body.data;

    expect(result.statusCode).toEqual(200);
    expect(success).toBeTruthy();
  });

  it('При cохранении нового cлова без поля ru получаем 403 и объект ошибки', async () => {
    const result = await request(app)
      .post('/api/words/create')
      .set('Authorization', `Bearer ${loginedUser.access_token}`)
      .field('en', randomstring.generate())
      .field('dictionary_id', dict_id);

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При cохранении нового cлова без поля en получаем 403 и объект ошибки', async () => {
    const result = await request(app)
      .post('/api/words/create')
      .set('Authorization', `Bearer ${loginedUser.access_token}`)
      .field('ru', randomstring.generate())
      .field('dictionary_id', dict_id);

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При cохранении нового cлова без поля dictionary_id получаем 403 и объект ошибки', async () => {
    const result = await request(app)
      .post('/api/words/create')
      .set('Authorization', `Bearer ${loginedUser.access_token}`)
      .field('ru', randomstring.generate())
      .field('en', randomstring.generate());

    const { error } = JSON.parse(result.error.text);

    expect(result.statusCode).toEqual(403);
    expect(error).toHaveProperty('message');
    expect(error).toHaveProperty('stack');
  });

  it('При измении счетчика слова при успехе получаем 200, success true', async () => {
    // Получения id слова
    const dictionaries_result = await request(app)
      .get('/api/dictionary/getall')
      .set('Authorization', `Bearer ${loginedUser.access_token}`);

    const { dictionaries } = dictionaries_result.body.data;
    const dict = dictionaries.find(item => item.id === dict_id);

    word_id = dict.words[0].id;

    const result = await request(app)
      .post('/api/words/changeCount')
      .set('Authorization', `Bearer ${loginedUser.access_token}`)
      .field('lang', 'ru')
      .field('words_id', word_id);

    const { success } = result.body.data;

    expect(result.statusCode).toEqual(200);
    expect(success).toBeTruthy();
  });

  it('После изменения счетчика слова он действительно изменен', async () => {
    const dictionaries_result = await request(app)
      .get('/api/dictionary/getall')
      .set('Authorization', `Bearer ${loginedUser.access_token}`);

    const { dictionaries } = dictionaries_result.body.data;
    const dict = dictionaries.find(item => item.id === dict_id);
    const word = dict.words.find(item => item.id === word_id);

    expect(word.ru_count).toBe(1);
  });
});
