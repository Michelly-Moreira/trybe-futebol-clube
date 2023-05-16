import { Router } from 'express';
import MatchController from '../controller/MatchController';

const matchesRouter = Router();

matchesRouter.get('/', MatchController.getAllMatches);

export default matchesRouter;
