import Words from '../../entities/Words';
import { IUpdateWords } from './i-words';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { AppDataSource } from '../../index';

export default class WordsModel {
  public static async getLastGroupId(): Promise<number | Error> {
    try {
      // const result = await AppDataSource.getRepository(Words).find({
      //   order: {
      //     groupId: 'DESC',
      //   },
      // });

      return 0;
      // return Number(result && result.length > 0 ? result[result.length - 1].groupId : 0);
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async save(data: Words[]): Promise<Words[] | Error> {
    try {
      return await AppDataSource.getRepository(Words).save(data);
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async update(body: IUpdateWords): Promise<void | Error> {
    const { id, type } = body;
    const field_name = `${type}Count`;

    try {
      const repo = AppDataSource.getRepository(Words);
      const word = await repo.findOneBy({ id });

      if (word) {
        const oldValue = type === 'name' ? word.nameCount : word.translateCount;
        await repo.update(id, { [field_name]: oldValue + 1 });
      } else {
        throw new Error('Word not found');
      }
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async delete(ids: number[]): Promise<void | Error> {
    try {
      await AppDataSource.getRepository(Words).delete(ids);
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }
}
