import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.performanceInformation);

export default leaderBoardRouter;
