import { Router } from 'express';
import multer from 'multer';
import TokensController from '../modules/tokens/Token.controller';
import SignUpController from '../modules/signUp/SignUp.controller';
import SignInController from '../modules/signIn/SignIn.controller';
import SignOutController from '../modules/signOut/SignOut.controller';

const router = Router();
const upload: multer.Instance = multer();

router.get('/test', (req, res) => {
  res.status(200);
  res.send('hello');
});

router.post('/signup', upload.none(), (req, res) => new SignUpController().signUp(req, res));
router.post('/signin', upload.none(), (req, res) => new SignInController().signIn(req, res));
router.post('/signout', upload.none(), (req, res) => new SignOutController().signOut(req, res));
router.post('/refresh', (req, res) => new TokensController().refresh(req, res));

export default router;
