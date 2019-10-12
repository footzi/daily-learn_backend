import { getRepository } from 'typeorm';
import Dictionaries from '../../entities/Dictionaries';
import { IDictionary } from './i-dictionary';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class DictionaryModel {
  public static async has(body: IDictionary): Promise<boolean | Error> {
    const { userId, name } = body;

    const respone = await getRepository(Dictionaries)
      .find({ userId, name })
      .then((result: Array<IDictionary>): boolean => result.length > 0)
      .catch((error: Error): Error => error);

    return respone;
  }

  public static async save(body: IDictionary): Promise<void | Error> {
    const dictionaries = new Dictionaries();

    try {
      await getRepository(Dictionaries).save(Object.assign(dictionaries, body));
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async getAll(userId: Number): Promise<Array<IDictionary> | Error> {
    const respone = await getRepository(Dictionaries)
      .find({ userId })
      .then((result: Array<IDictionary>): Array<IDictionary> => result)
      .catch((error: Error): Error => error);

    return respone;
  }
}
