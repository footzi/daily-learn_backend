import Tokens from '../../entities/Tokens';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';
import { AppDataSource } from '../../index';

export default class SignOutModel {
  public static async delete(userId: number): Promise<void> {
    try {
      await AppDataSource.getRepository(Tokens).delete({ userId });
    } catch (err) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, err);
    }
  }
}
