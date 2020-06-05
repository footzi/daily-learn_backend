import { getRepository } from 'typeorm';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import User from '../../entities/User';
import { IUpdateUser } from './i-user';

export default class UserModel {
  public static async get(id: number): Promise<User | undefined | Error> {
    try {
      const user = await getRepository(User).findOne({ id });

      delete user?.password;

      return user;
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async change(id: number, body: IUpdateUser): Promise<void | Error> {
    try {
      await getRepository(User).update({ id }, body);
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }
}
