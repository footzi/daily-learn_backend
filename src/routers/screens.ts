import { Router } from 'express';
import multer from 'multer';
import TokenController from '../modules/tokens/Token.controller';
import HomeController from '../modules/home/Home.controller';

const router = Router();
const upload: multer.Instance = multer();

router.get('/home', TokenController.check, (req, res) => new HomeController().getData(req, res));

export default router;
