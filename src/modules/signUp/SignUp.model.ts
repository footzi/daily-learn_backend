import { getRepository } from 'typeorm';
import User from '../../entities/User';
import { IUser } from '../../interfaces';
import { IRequestSingUp } from './i-signup';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class SignUpModel {
  public static async hasUser(login: string): Promise<boolean | Error> {
    try {
      const response = await getRepository(User).findOne({ login });

      return !!response;
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async saveUser(body: IRequestSingUp): Promise<IUser | Error> {
    try {
      const user = new User();
      const response = await getRepository(User).save(Object.assign(user, body));

      if (response) {
        delete response.password;
      }

      return response;
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }
}
