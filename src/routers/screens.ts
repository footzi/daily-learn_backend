import { Router } from 'express';
import TokenController from '../modules/tokens/Token.controller';
import HomeController from '../modules/home/Home.controller';

const router = Router();

router.get('/home', TokenController.check, (req, res) => new HomeController().getData(req, res));

export default router;
