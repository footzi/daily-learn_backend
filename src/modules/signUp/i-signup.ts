import { Request, Response } from 'express';

export interface ISignUpController {
  body: IRequestSingUp;
  user: {
    id: number;
  };
  tokens: {
    access: string;
    refresh: string;
    expire: number;
  };
  signUp(req: Request, res: Response): Promise<void>;
}

export interface IRequestSingUp {
  login: string;
  email?: string;
  password: string;
}
