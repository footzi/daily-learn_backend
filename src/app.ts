import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import express from 'express';
import cors from 'cors';
import config from 'config';
import api from './routers/api';

const app = express();
const port = config.get('port');

app.use(cookieParser());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api', cors({ credentials: true, origin: `http://localhost:3000` }), api);

export const listenApp = (): void => {
  app.listen(port, (): void => {
    console.log(`> Api listening on - http://localhost:${port}`);
  });
};

export default app;
