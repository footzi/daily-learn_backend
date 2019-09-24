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
  hasUser(login: string): Promise<boolean | Error>;
  saveUser(body: IRequestSingUp): Promise<User | Error>;
}

export interface IRequestSingUp {
  login: string;
  email?: string;
  password: string;
}
