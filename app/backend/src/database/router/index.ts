import { Router } from 'express';
import teamsRouter from './TeamRouter';
import loginRouter from './LoginRouter';
import usersRouter from './UserRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', loginRouter);
router.use('/user', usersRouter);

export default router;
