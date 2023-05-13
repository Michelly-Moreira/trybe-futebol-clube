import { Router } from 'express';
import teamsRouter from './TeamRouter';
import usersRouter from './UserRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);

export default router;
