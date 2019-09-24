import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import api from './routers/api';

const CONFIG = require('../server.config.json');

const app = express();

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', cors({ credentials: true, origin: `http://localhost:3000` }), api);

export const listenApp = (): void => {
  app.listen(CONFIG.port, CONFIG.host, (): void => {
    console.log(`> Api listening on http://${CONFIG.host}:${CONFIG.port}`);
  });
};

export default app;
