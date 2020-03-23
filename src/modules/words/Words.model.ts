import { getRepository } from 'typeorm';
import Words from '../../entities/Words';
import { IUpdateWords } from './i-words';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class WordsModel {
  public static async getLastGroupId(): Promise<number | Error> {
    try {
      const result = await getRepository(Words).findOne({
        order: {
          groupId: 'DESC'
        }
      });

      return Number(result ? result.groupId : 0);
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async save(data: Words[]): Promise<Words[] | Error> {
    try {
      return await getRepository(Words).save(data);
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async update(body: IUpdateWords): Promise<void | Error> {
    const { id } = body;

    try {
      await getRepository(Words).update({ id }, { count: () => `${'count'} + 1` });
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
