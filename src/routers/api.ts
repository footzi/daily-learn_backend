import { Router } from 'express';
import TokenController from '../modules/tokens/Token.controller';
import SignUpController from '../modules/signUp/SignUp.controller';
import SignInController from '../modules/signIn/SignIn.controller';
import SignOutController from '../modules/signOut/signOut.controller';
import DictionaryController from '../modules/dictionary/Dictionary.controller';
import WordsController from '../modules/words/Words.controller';

const router = Router();

router.post('/signup', (req, res) => new SignUpController().signUp(req, res));
router.post('/signin', (req, res) => new SignInController().signIn(req, res));
router.post('/signout', (req, res) => new SignOutController().signOut(req, res));
router.post('/refresh', (req, res) => new TokenController().refresh(req, res));

router.get('/dictionary/getAll', TokenController.check, (req, res) =>
  DictionaryController.getAll(req, res)
);
router.post('/dictionary/create', TokenController.check, (req, res) =>
  DictionaryController.create(req, res)
);
router.delete('/dictionary/delete', TokenController.check, (req, res) =>
  DictionaryController.delete(req, res)
);

router.post('/words/create', TokenController.check, (req, res) => WordsController.create(req, res));
router.put('/words/changeCount', TokenController.check, (req, res) =>
  WordsController.changeCount(req, res)
);
router.delete('/words/delete', TokenController.check, (req, res) => WordsController.delete(req, res));

export default router;
