import { getRepository } from 'typeorm';
import Words from '../../entities/Words';
import { ISaveWords, IUpdateWords } from './i-words';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class WordsModel {
  public static async getLastGroupId(): Promise<number | Error> {
    const words = new Words();


    try {
      const result = await getRepository(Words).findOne({
        order: {
          groupId: "DESC"
        }
      });

      return Number(result ? result.groupId : 0);
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
    //
    // try {
    //   const result = await getRepository(Words).save(Object.assign(words, body));
    //
    //   return result.id;
    // } catch (err) {
    //   throw errorTypeMessage(E.critical, err);
    // }
  }

  public static async save(body: ISaveWords): Promise<number | Error> {
    const words = new Words();


    try {
      const result = await getRepository(Words).save(body);

      return result;
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
    //
    // try {
    //   const result = await getRepository(Words).save(Object.assign(words, body));
    //
    //   return result.id;
    // } catch (err) {
    //   throw errorTypeMessage(E.critical, err);
    // }
  }

  public static async update(body: IUpdateWords): Promise<void | Error> {
    const { words_id, lang } = body;
    const field_name = `${lang}_count`;

    try {
      await getRepository(Words).update({ id: words_id }, { [field_name]: () => `${field_name} + 1` });
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async delete(ids: number[]): Promise<void | Error> {
    try {
      await getRepository(Words).delete(ids);
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }
}
