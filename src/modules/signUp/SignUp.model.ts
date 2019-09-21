import { getRepository } from 'typeorm';
import User from '../../entities/User';
import { IUser } from '../../entities/interfaces';
import { IRequestSingUp } from './i-signup';

export default class SignUpModel {
  public static async hasUser(name: string) {
    return await getRepository(User)
      .findOne({ name })
      .then((result: IUser | undefined): boolean => result ? true : false)
      .catch((error: Error): Error => error);
  }

  public static async saveUser(body: IRequestSingUp) {
    const user = new User();

    return await getRepository(User)
      .save(Object.assign(user, body))
      .then((result: IUser): IUser => result)
      .catch((error: Error): Error => error);
  }
}
