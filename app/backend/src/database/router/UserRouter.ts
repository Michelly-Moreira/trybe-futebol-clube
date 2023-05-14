import { Router } from 'express';
import userController from '../controller/UserController';
import LoginMiddleware from '../middleware/LoginValidation';
import TokenMiddleware from '../middleware/TokenValidation';

const usersRouter = Router();

usersRouter.post(
  '/',
  LoginMiddleware.loginValidation,
  LoginMiddleware.userValidation,
  userController.signin,
);

usersRouter.get(
  '/role',
  TokenMiddleware.tokenValidation,
  userController.getRole,
);

export default usersRouter;
