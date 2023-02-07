import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import { Request, Response } from 'express';
import randomstring from 'randomstring';
import SingUpModel from './SignUp.model';
import User from '../../entities/User';
import TokenModel from '../tokens/Token.model';
import { checkTypeValue, sendData } from '../../utils';
import { typesError, errorMessage, errorTypeMessage } from '../../utils/errorHandler';
import { ISignUpController } from './i-signup';
import { E } from '../../constans';
import CONFIG from '../../config';

const { JWT_SECRET, JWT_EXPIRES_IN, JWT_REFRESH_EXPIRES_IN } = CONFIG;

export default class SignUpController implements ISignUpController {
  body: {
    login: string;
    email?: string;
    password: string;
  };

  user: {
    id: number;
    password: string;
  };

  tokens: {
    access: string;
    refresh: string;
    expire: number;
  };

  constructor() {
    this.body = { login: '', email: '', password: '' };
    this.user = { id: 0, password: '' };
    this.tokens = { access: '', refresh: '', expire: 0 };
  }

  public async signUp(req: Request, res: Response): Promise<void> {
    this.body.login = req.body.login;
    this.body.password = req.body.password;
    this.body.email = req.body.email || '';

    try {
      this.checkValue();
      await this.hasUser();
      await this.saveUser();
      await this.createTokens();
      this.send(res);
    } catch (error) {
      // @ts-ignore
      const code = typesError[error.type];
      // @ts-ignore
      const data = sendData('', errorMessage(error.content));

      res.status(code).send(data);
    }
  }

  private checkValue(): void {
    const { login, password } = this.body;
    const isValidLogin = checkTypeValue(login, 'string');
    const isValidPassword = checkTypeValue(password, 'string');

    if (!isValidLogin || !isValidPassword) {
      throw errorTypeMessage(E.invalid_data, 'Oт клиента получены неверные данные');
    }
  }

  private async hasUser(): Promise<void> {
    const { login } = this.body;
    const hasUser = await SingUpModel.hasUser(login);

    if (hasUser) {
      throw errorTypeMessage(E.invalid_data, 'Данный пользователь уже существует');
    }
  }

  private async saveUser(): Promise<void> {
    const { login, email, password } = this.body;
    const passwordHash = bcrypt.hashSync(password, 10);

    try {
      const user = await SingUpModel.saveUser({ login, email, password: passwordHash });

      if (user instanceof User) {
        this.user = user;
      }
    } catch (error) {
      // @ts-ignore
      throw errorTypeMessage(E.critical, error);
    }
  }

  private async createTokens(): Promise<void> {
    const access = { id: this.user.id };
    const refresh = { id: this.user.id, key: randomstring.generate() };

    this.tokens.access = jwt.sign(access, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });
    this.tokens.refresh = jwt.sign(refresh, JWT_SECRET, { expiresIn: JWT_REFRESH_EXPIRES_IN });

    // @ts-ignore
    const decoded: any = jwt.decode(this.tokens.access, JWT_SECRET);
    this.tokens.expire = decoded ? decoded.exp : 0;

    await TokenModel.save({ userId: this.user.id, refresh: this.tokens.refresh });
  }

  private send(res: Response): void {
    const tokens = {
      access_token: this.tokens.access,
      refresh_token: this.tokens.refresh,
      expire: this.tokens.expire,
    };

    if (this.user.password) {
      // @ts-ignore
      delete this.user.password;
    }

    const data = sendData({ user: this.user, tokens });
    res.send(data);
  }
}
