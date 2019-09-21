import { Request, Response } from 'express';
import User from '../../entities/User';

export interface ISignUpController {
  body: IRequestSingUp;
  user: {
    id: number;
  };
  tokens: {
    access: string;
    refresh: string;
  };
  signUp(req: Request, res: Response): Promise<void>;
}

export interface ISignUpModel {
  hasUser(name: string): Promise<boolean | Error>;
  saveUser(body: IRequestSingUp): Promise<User | Error>;
}

export interface IRequestSingUp {
  name: string;
  surname: string;
  password: string;
}
