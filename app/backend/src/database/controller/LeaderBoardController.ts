import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  public static async performanceInformationHome(_req: Request, res: Response): Promise<Response> {
    const performanceTeams = await LeaderBoardService.performanceInformation('home');
    return res.status(200).json(performanceTeams);
  }

  public static async performanceInformationAway(_req: Request, res: Response): Promise<Response> {
    const performanceTeams = await LeaderBoardService.performanceInformation('away');
    return res.status(200).json(performanceTeams);
  }
}
