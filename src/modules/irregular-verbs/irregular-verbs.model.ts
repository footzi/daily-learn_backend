import { getRepository } from 'typeorm';
import IrregularVerbs from '../../entities/User_Irregular-Verbs';
import { IDictionary } from '../../entities/interfaces';
import { ISaveDictionary, IHasDictionary, IGetAllDictionary } from './i-dictionary';
import { errorTypeMessage } from '../../utils/errorHandler';
import { E } from '../../constans';

export default class IrreguralVerbsModel {
  public static async getAll(body: IGetAllDictionary): Promise<Array<IDictionary> | Error> {
    const { userId } = body;


    // const users = await getRepository(IrregularVerbs)
    //   .createQueryBuilder("user_words")
    //   .leftJoinAndSelect("user_words", "verbId")
    //   .getMany();

    // console.log(users)

    const respone = await getRepository(IrregularVerbs)
      .find({ relations: ['verb'] })
      .then((result) => console.log(result))
      .catch((error: Error): Error => console.log(error));

    // return respone;
  }
}
