import axios from 'axios';
import { Router, Request, Response } from 'express';
import AuthController from '../controllers/Auth';
import ProfileController from '../controllers/Profile';

const router = Router();

router.get('/about', AuthController.auth, async (req: Request, res: Response): Promise<void> => {
  const response = await axios.get('https://jsonplaceholder.typicode.com/users');
  res.send({
    user: res.locals.user,
    todos: response.data
  });
});

// getUser для незакрытых страниц
router.get('/home', AuthController.getUser, (req: Request, res: Response): void => {
  res.send({ user: res.locals.user });
});

router.post('/profile', AuthController.auth, ProfileController.getProfile);

router.get('/home', AuthController.getUser, (req: Request, res: Response): void => {
  res.send({ user: res.locals.user });
});

export default router;
