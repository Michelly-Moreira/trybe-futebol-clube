import { Router } from 'express';
import LeaderBoardController from '../controller/LeaderBoardController';

const leaderBoardRouter = Router();

leaderBoardRouter.get('/home', LeaderBoardController.performanceInformationHome);
leaderBoardRouter.get('/away', LeaderBoardController.performanceInformationAway);

export default leaderBoardRouter;
