import { Router } from 'express';
import MatchController from '../controller/MatchController';

const matchesRouter = Router();

matchesRouter.get('/', MatchController.findMatches);
matchesRouter.patch('/:id/finish', MatchController.addByIdd);

export default matchesRouter;
