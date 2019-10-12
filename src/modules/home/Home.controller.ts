import { Request, Response } from 'express';
import { sendData } from '../../utils';

export default class HomeController {
  // @ts-ignore
  getData(req: Request, res: Response) {
    const home = {
      dictionary: 'Hello!!!'
    };

    res.send(sendData({home}));
  }
}
