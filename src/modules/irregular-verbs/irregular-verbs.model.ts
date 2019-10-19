import { getRepository } from 'typeorm';
import IrregularVerbs from '../../entities/Irregular-Verbs';
import UserIrregularVerbs from '../../entities/User_Irregular-Verbs';
import { IIrregularVerbs, IUserIrregularVerbs } from '../../entities/interfaces';
import { IGetAllIrregular, IHasIrregular, ISaveIrregular, IUpdateIrregular } from './i-irregular';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class IrreguralVerbsModel {
  public static async getAll(body: IGetAllIrregular): Promise<Array<IIrregularVerbs> | Error> {
    const { userId } = body;

    try {
      const respone = await getRepository(IrregularVerbs)
        .createQueryBuilder('irregular_verbs')
        .leftJoinAndSelect(
          'irregular_verbs.user_count',
          'user_irregular_verbs',
          'user_irregular_verbs.userId = :userId',
          { userId }
        )
        .getMany();

      return respone;
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async has(body: IHasIrregular): Promise<boolean | Error> {
    const { userId, verb_id } = body;

    const respone = await getRepository(UserIrregularVerbs)
      .findOne({ where: { userId, verb: verb_id } })
      .then((result: IUserIrregularVerbs | undefined): boolean => !!result)
      .catch((error: Error): Error => error);

    return respone;
  }

  public static async save(body: ISaveIrregular): Promise<void | Error> {
    const { userId, verb_id, form } = body;
    const word = new UserIrregularVerbs();
    const field_name = `${form}_count`;
    const fields = { verb: verb_id, [field_name]: 1, userId };

    try {
      await getRepository(UserIrregularVerbs).save(Object.assign(word, fields));
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async update(body: IUpdateIrregular): Promise<void | Error> {
    const { userId, verb_id, form } = body;
    const field_name = `${form}_count`;

    try {
      await getRepository(UserIrregularVerbs)
        .createQueryBuilder()
        .update(UserIrregularVerbs)
        .set({ [field_name]: () => `${field_name} + 1` })
        .where('verb = :verb_id', { verb_id, userId })
        .execute();
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }
}
