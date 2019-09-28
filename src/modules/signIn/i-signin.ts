import { Request, Response } from 'express';

export interface ISignInController {
  body: IRequestSingIn;
  user: {
    id: number;
    password: string;
  };
  tokens: {
    access: string;
    refresh: string;
    expire: number;
  };
  signIn(req: Request, res: Response): Promise<void>;
}

export interface IRequestSingIn {
  login: string;
  password: string;
}
