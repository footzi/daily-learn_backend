import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import User from '../../entities/User';
import { IUpdateUser } from './i-user';
import { AppDataSource } from '../../index';

export default class UserModel {
  public static async get(id: number): Promise<User | null | Error> {
    try {
      const user = await AppDataSource.getRepository(User).findOneBy({ id });

      // @ts-ignore
      delete user?.password;

      return user;
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }

  public static async change(id: number, body: IUpdateUser): Promise<void | Error> {
    try {
      await AppDataSource.getRepository(User).update({ id }, body);
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }
}
