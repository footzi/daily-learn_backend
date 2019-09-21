import { getRepository } from 'typeorm';
import Tokens from '../../entities/Tokens';
import { IToken } from '../../interfaces';

export default class TokenModel {
  public static async save(body: IToken): Promise<IToken> {
    const tokens = new Tokens();

    const newToken = await getRepository(Tokens)
      .save(Object.assign(tokens, body))
      .then((result: IToken): IToken => result)
      .catch((error: Error): IToken => {
        throw error;
      });

    return newToken;
  }

  public static async get(userId: number): Promise<IToken> {
    const user = await getRepository(Tokens)
      .findOne({userId})
      // @ts-ignore
      .then((result: IToken): IToken => result)
      .catch((error: Error): Error => {
        throw error;
      });

    return user;
  }

  public static async update(userId: number, refresh: string):Promise<IToken> {
    try {
      const user = await getRepository(Tokens).findOne({ userId });
      
      if (!user) {
        throw "Ошибка при обновлении токена пользователя"
      }

      user.refresh = refresh;
      const updateUser = await getRepository(Tokens).save(user);

      return updateUser;
    } catch(error) {
      throw error;
    }
  }
}
