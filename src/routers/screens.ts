import { Router } from 'express';
import multer from 'multer';
import AuthController from '../modules/auth/Auth.controller';
import HomeController from '../modules/home/Home.controller';

const router = Router();
const upload: multer.Instance = multer();

router.get('/home', AuthController.checkToken, (req, res) => new HomeController().getData(req, res));

export default router;
