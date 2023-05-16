import { Router } from 'express';
import MatchController from '../controller/MatchController';
import TokenMiddleware from '../middleware/TokenValidation';

const matchesRouter = Router();

matchesRouter.get('/', MatchController.findMatches);
matchesRouter.patch('/:id/finish', TokenMiddleware.tokenValidation, MatchController.finishMatch);
matchesRouter.patch('/:id', TokenMiddleware.tokenValidation, MatchController.matchInProgress);

export default matchesRouter;
