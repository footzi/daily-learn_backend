import { Request, Response } from 'express';

export default class HomeController {
  // @ts-ignore
  getData(req: Request, res: Response,) {
    // @ts-ignore
    return res.status(200).send('home contrtoller');
  }
}
