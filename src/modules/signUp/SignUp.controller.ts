import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import randomstring from 'randomstring';
import { ISignUpController } from './i-signup';
import SingUpModel from './SignUp.model';
import User from '../../entities/User';
import { checkTypeValue, errorMessage, errorTypeMessage, sendData } from '../../utils';
import TokenModel from '../tokens/Token.model';

const CONFIG = require('../../../server.config.json');

export default class SignUpController implements ISignUpController {
  body: {
    name: string;
    surname: string;
    password: string;
  };

  user: {
    id: number;
  };

  tokens: {
    access: string;
    refresh: string;
  };

  constructor() {
    this.body = { name: '', surname: '', password: '' };
    this.user = { id: 0 };
    this.tokens = { access: '', refresh: '' };
  }

  public async signUp(req: Request, res: Response): Promise<void> {
    this.body = req.body;

    try {
      this.checkValue();
      await this.hasUser();
      await this.saveUser();
      this.createTokens();
      this.send(res);
    } catch (error) {
      const code = error.type === 'not_access' ? 403 : 500;
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  private checkValue(): void {
    const { name, surname, password } = this.body;
    const isValidName = checkTypeValue(name, 'string');
    const isValidSurname = checkTypeValue(surname, 'string');
    const isValidPassword = checkTypeValue(password, 'string');

    if (!isValidName || !isValidSurname || !isValidPassword) {
      throw errorTypeMessage('not_access', 'Oт клиента получены неверные данные');
    }
  }

  private async hasUser(): Promise<void> {
    const { name } = this.body;

    try {
      const hasUser = await SingUpModel.hasUser(name);

      if (hasUser) {
        throw errorTypeMessage('not_access', 'Данный пользователь уже существует');
      }
    } catch (error) {
      throw errorTypeMessage('critical', error);
    }
  }

  private async saveUser(): Promise<void> {
    const { name, surname, password } = this.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
      const user = await SingUpModel.saveUser({ name, surname, password: passwordHash });

      if (user instanceof User) {
        this.user.id = user.id;
      }
    } catch (error) {
      throw errorTypeMessage('critical', error);
    }
  }

  private createTokens(): void {
    const access = { id: this.user.id };
    const refresh = { id: this.user.id, key: randomstring.generate() };
    // @ts-ignore
    this.tokens.access = jwt.sign(access, CONFIG.secret, { expiresIn: CONFIG.expire_access });
     // @ts-ignore
    this.tokens.refresh = jwt.sign(refresh, CONFIG.secret, { expiresIn: CONFIG.expire_refresh });

    try {
      TokenModel.save({ userId: this.user.id, refresh: this.tokens.refresh });
    } catch (error) {
      throw errorTypeMessage('critical', error);
    }
  }

  private send(res: Response): void {
    const user = { id: this.user.id, access_token: this.tokens.access, refresh_token: this.tokens.refresh };
    const data = sendData({ user });
    res.send(data);
  }
}
