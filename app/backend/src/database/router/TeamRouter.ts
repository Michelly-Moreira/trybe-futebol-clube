import { Router } from 'express';
import TeamController from '../controller/TeamController';

const teamsRouter = Router();
// teamsRouter.post('/teams', async(req, res) => {const team = await TeamService.create(); return res.status(201).json(team)});

teamsRouter.get('/teams', TeamController.findAll);
teamsRouter.get('/teams/:id', TeamController.findById);

export default teamsRouter;
