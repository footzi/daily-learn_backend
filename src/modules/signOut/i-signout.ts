import { Request, Response } from 'express';

export interface ISignOutController {
  access_token: string;
  decoded: { id: number };
  signOut(req: Request, res: Response): Promise<void>;
}
