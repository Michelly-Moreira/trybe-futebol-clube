import { Router } from 'express';
import teamsRouter from './TeamRouter';
import usersRouter from './UserRouter';
import matchesRouter from './MatchRouter';
import leaderBoardRouter from './LeaderBoardRouter';

const router = Router();

router.use('/teams', teamsRouter);
router.use('/login', usersRouter);
router.use('/matches', matchesRouter);
router.use('/leaderboard', leaderBoardRouter);

export default router;
