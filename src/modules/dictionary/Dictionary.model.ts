import { getRepository } from 'typeorm';
import Dictionaries from '../../entities/Dictionaries';
import { IDictionary } from '../../entities/interfaces';
import { ISaveDictionary, IHasDictionary, IGetAllDictionary } from './i-dictionary';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class DictionaryModel {
  public static async has(body: IHasDictionary): Promise<boolean | Error> {
    const { userId, name } = body;

    const respone = await getRepository(Dictionaries)
      .find({ userId, name })
      .then((result: Array<IDictionary>): boolean => result.length > 0)
      .catch((error: Error): Error => error);

    return respone;
  }

  public static async save(body: ISaveDictionary): Promise<number | Error> {
    const dictionaries = new Dictionaries();

    try {
      const result = await getRepository(Dictionaries).save(Object.assign(dictionaries, body));

      return result.id
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async getAll(body: IGetAllDictionary): Promise<Array<IDictionary> | Error> {
    const { userId } = body;

    const respone = await getRepository(Dictionaries)
      .find({ where: { userId }, relations: ['words'] })
      .then((result: Array<IDictionary>): Array<IDictionary> => result)
      .catch((error: Error): Error => error);

    return respone;
  }
}
