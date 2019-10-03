import { getRepository } from 'typeorm';
import Tokens from '../../entities/Tokens';
import { IToken } from './i-tokens';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class TokenModel {
  public static async save(body: IToken): Promise<void | Error> {
    const { userId, refresh } = body;

    try {
      const hasUser = await getRepository(Tokens).findOne({ userId });

      if (hasUser) {
        await getRepository(Tokens).update({ userId }, { refresh });
      } else {
        const tokens = new Tokens();
        await getRepository(Tokens).save(Object.assign(tokens, body));
      }
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async get(userId: number): Promise<IToken | Error | undefined> {
    const response = await getRepository(Tokens)
      .findOne({ userId })
      .then((result: IToken | undefined): IToken | undefined => result)
      .catch((error: Error): Error => error);

    return response;
  }
}
