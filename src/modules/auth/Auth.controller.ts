import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import { errorMessage, sendData, parseBearer } from '../../utils';

const CONFIG = require('../../../server.config.json');

export default class AuthController {
  static checkToken(req: Request, res: Response, next: Function): void {
    if (!req.headers.authorization) {
      const data = sendData('', errorMessage(new Error('Нет заголовка авторизации')));

      res.status(403).send(data);
      return;
    }

    const token = parseBearer(req.headers.authorization);

    jwt.verify(token, CONFIG.secret, (err, decoded) => {
      if (decoded) {
        res.locals.userId = decoded.id;
        next();
      } else {
        const data = sendData('', errorMessage(new Error(err.message)));

        res.status(403).send(data);
      }
    });
  }
}
