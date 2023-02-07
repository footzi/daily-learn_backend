import User from '../../entities/User';
import { IUser } from '../../interfaces';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { AppDataSource } from '../../index';

export default class SignInModel {
  public static async getUser(login: string): Promise<IUser | Error | null> {
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({ login });

      return user;
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }
}
