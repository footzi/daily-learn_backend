import { Router } from 'express';
import multer from 'multer';
import TokenController from '../modules/tokens/Token.controller';
import SignUpController from '../modules/signUp/SignUp.controller';
import SignInController from '../modules/signIn/SignIn.controller';
import SignOutController from '../modules/signOut/signOut.controller';
import DictionaryController from '../modules/dictionary/Dictionary.controller';
import WordsController from '../modules/words/Words.controller';
import UserController from '../modules/user/User.controller';

const router = Router();
const upload = multer();

router.post('/signup', upload.none(), (req, res) => new SignUpController().signUp(req, res));
router.post('/signin', upload.none(), (req, res) => new SignInController().signIn(req, res));
router.post('/signout', upload.none(), (req, res) => new SignOutController().signOut(req, res));
router.post('/refresh', upload.none(), (req, res) => new TokenController().refresh(req, res));

router.get('/dictionary/getAll', TokenController.check, (req, res) => DictionaryController.getAll(req, res));
router.post('/dictionary/create', upload.none(), TokenController.check, (req, res) => DictionaryController.create(req, res));
router.delete('/dictionary/delete', upload.none(), TokenController.check, (req, res) => DictionaryController.delete(req, res));


router.get('/user/get', TokenController.check, (req, res) => UserController.get(req, res));
router.put('/user/change', upload.none(), TokenController.check, (req, res) => UserController.change(req, res));

router.post('/words/create', upload.none(), TokenController.check, (req, res) => WordsController.create(req, res));
router.put('/words/changeCount', upload.none(), TokenController.check, (req, res) => WordsController.changeCount(req, res));
router.delete('/words/delete', upload.none(), TokenController.check, (req, res) => WordsController.delete(req, res));

export default router;
