import { Router } from 'express';
import userController from '../controller/UserController';
import LoginMiddleware from '../middleware/LoginValidation';

const usersRouter = Router();

usersRouter.post('/', LoginMiddleware.loginValidation, userController.signin);

export default usersRouter;
