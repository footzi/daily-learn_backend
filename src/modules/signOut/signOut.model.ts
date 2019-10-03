import { getRepository } from 'typeorm';
import Tokens from '../../entities/Tokens';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class SignOutModel {
  public static async delete(userId: number): Promise<void> {
    try {
      await getRepository(Tokens).delete({ userId });
    } catch (err) {
      throw errorTypeMessage(E.critical, err);
    }
  }
}
