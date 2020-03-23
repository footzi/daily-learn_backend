import { getRepository } from 'typeorm';
import User from '../../entities/User';
import { IUser } from '../../interfaces';
import { IRequestSingUp } from './i-signup';

export default class SignUpModel {
  public static async hasUser(login: string): Promise<boolean | Error> {
    const respone = await getRepository(User)
      .findOne({ login })
      .then((result: IUser | undefined): boolean => !!result)
      .catch((error: Error): Error => error);

    return respone;
  }

  public static async saveUser(body: IRequestSingUp): Promise<IUser | Error> {
    const user = new User();

    const response = await getRepository(User)
      .save(Object.assign(user, body))
      .then((result: IUser): IUser => result)
      .catch((error: Error): Error => error);

    return response;
  }
}
