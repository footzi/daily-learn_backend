import { Request, Response } from 'express';

export default class HomeController {
  getData(req: Request, res: Response,) {
    res.send('home contrtoller', res.locals.userId);
  }
}
