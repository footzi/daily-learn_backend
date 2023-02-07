import Dictionaries from '../../entities/Dictionaries';
import { ISaveDictionary, IHasDictionary, IGetAllDictionary } from './i-dictionary';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { AppDataSource } from '../../index';

export default class DictionaryModel {
  public static async has(body: IHasDictionary): Promise<boolean | Error> {
    const { userId, name } = body;

    try {
      const response = await AppDataSource.getRepository(Dictionaries).findBy({ userId, name });

      return response.length > 0;
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async save(body: ISaveDictionary): Promise<number | Error> {
    const dictionaries = new Dictionaries();

    try {
      const result = await AppDataSource.getRepository(Dictionaries).save(Object.assign(dictionaries, body));

      return result.id;
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async getAll(body: IGetAllDictionary): Promise<Array<Dictionaries> | Error> {
    const { userId } = body;

    try {
      return await AppDataSource.getRepository(Dictionaries).find({ where: { userId }, relations: ['words'] });
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async delete(id: number): Promise<void | Error> {
    try {
      await AppDataSource.getRepository(Dictionaries).delete(id);
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }
}
