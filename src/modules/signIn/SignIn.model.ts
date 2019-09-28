import { getRepository } from 'typeorm';
import User from '../../entities/User';
import { IUser } from '../../entities/interfaces';

export default class SignInModel {
  public static async signIn(login: string): Promise<IUser | Error | undefined> {
    const response = await getRepository(User)
      .findOne({ login })
      .then((result: IUser | undefined): IUser | undefined => result)
      .catch((error: Error): Error => error);

    return response;
  }
}
