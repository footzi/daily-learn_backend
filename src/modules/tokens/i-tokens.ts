import { Request, Response } from 'express';

export interface ITokensController {
  refresh_token: string;
  decoded: {
    id: number;
  };
  user: { id: number; refresh: string };
  newtokens: {
    access: string;
    refresh: string;
    expire: number;
  };
  refresh(req: Request, res: Response): Promise<void>;
}

export interface IToken {
  userId: number;
  refresh: string;
}
