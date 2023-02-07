import Tokens from '../../entities/Tokens';
import { IToken } from './i-tokens';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { AppDataSource } from '../../index';

export default class TokenModel {
  public static async save(body: IToken): Promise<void | Error> {
    const { userId, refresh } = body;

    try {
      const tokensRepo = AppDataSource.getRepository(Tokens);
      const hasUser = await tokensRepo.findOneBy({ userId });

      if (hasUser) {
        await tokensRepo.update({ userId }, { refresh });
      } else {
        const tokens = new Tokens();
        await tokensRepo.save(Object.assign(tokens, body));
      }
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async get(userId: number): Promise<IToken | Error | null> {
    const response = await AppDataSource.getRepository(Tokens)
      .findOneBy({ userId })
      .then((result: IToken | null): IToken | null => result)
      .catch((error: Error): Error => error);

    return response;
  }
}
