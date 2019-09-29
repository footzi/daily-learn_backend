import { Request, Response } from 'express';

export default class HomeController {
  // @ts-ignore
  getData(req: Request, res: Response,) {
    // @ts-ignore
    res.send('home contrtoller', res.locals.userId);
  }
}
