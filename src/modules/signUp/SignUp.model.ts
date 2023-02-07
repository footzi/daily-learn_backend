import User from '../../entities/User';
import { IUser } from '../../interfaces';
import { IRequestSingUp } from './i-signup';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { AppDataSource } from '../../index';

export default class SignUpModel {
  public static async hasUser(login: string): Promise<boolean | Error> {
    try {
      const response = await AppDataSource.getRepository(User).findOneBy({ login });

      return !!response;
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async saveUser(body: IRequestSingUp): Promise<IUser | Error> {
    try {
      const user = new User();
      const response = await AppDataSource.getRepository(User).save(Object.assign(user, body));

      return response;
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }
}
