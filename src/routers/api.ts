import { Router } from 'express';
import multer from 'multer';
import TokenController from '../modules/tokens/Token.controller';
import SignUpController from '../modules/signUp/SignUp.controller';
import SignInController from '../modules/signIn/SignIn.controller';
import SignOutController from '../modules/signOut/SignOut.controller';
import DictionaryController from '../modules/dictionary/dictionary.controller';

const router = Router();
const upload: multer.Instance = multer();

router.get('/test', (req, res) => {
  res.status(200);
  res.send('hello');
});

router.post('/signup', upload.none(), (req, res) => new SignUpController().signUp(req, res));
router.post('/signin', upload.none(), (req, res) => new SignInController().signIn(req, res));
router.post('/signout', upload.none(), (req, res) => new SignOutController().signOut(req, res));
router.post('/refresh', (req, res) => new TokenController().refresh(req, res));

router.get('/dictionary/getAll', upload.none(), TokenController.check, (req, res) =>
  DictionaryController.getAll(req, res)
);

router.post('/dictionary/create', upload.none(), TokenController.check, (req, res) =>
  DictionaryController.create(req, res)
);

export default router;
