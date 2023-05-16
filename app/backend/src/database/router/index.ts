import { Router } from 'express';
import teamsRouter from './TeamRouter';
import usersRouter from './UserRouter';
import matchesRouter from './MatchRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);

export default router;
