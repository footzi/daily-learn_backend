import { Router } from 'express';
import multer from 'multer';
import SignUpController from '../modules/signUp/SignUp.controller';

const router = Router();
const upload: multer.Instance = multer();

router.get('/test', (req, res) => {
  res.status(200);
  res.send('hello');
});

router.post('/signup', upload.none(), (req, res) => new SignUpController().signUp(req, res));

export default router;
