import { getRepository } from 'typeorm';
import User from '../../entities/User';
import { IUser } from '../../interfaces';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class SignInModel {
  public static async getUser(login: string): Promise<IUser | Error | undefined> {
    try {
      const user = await getRepository(User).findOne({ login });

      return user;
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }
}
