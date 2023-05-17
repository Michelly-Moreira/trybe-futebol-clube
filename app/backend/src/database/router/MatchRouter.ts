import { Router } from 'express';
import MatchController from '../controller/MatchController';
import TokenMiddleware from '../middleware/TokenValidation';
import MatchMiddleware from '../middleware/MatchValidation';

const matchesRouter = Router();

matchesRouter.get('/', MatchController.findMatches);
matchesRouter.patch('/:id/finish', TokenMiddleware.tokenValidation, MatchController.finishMatch);
matchesRouter.patch('/:id', TokenMiddleware.tokenValidation, MatchController.matchInProgress);
matchesRouter.post(
  '/',
  TokenMiddleware.tokenValidation,
  MatchMiddleware.MatchValidation,
  MatchController.create,
);

export default matchesRouter;
