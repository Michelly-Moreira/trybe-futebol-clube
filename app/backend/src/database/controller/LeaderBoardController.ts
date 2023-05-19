import { Request, Response } from 'express';
import LeaderBoardService from '../services/LeaderBoardService';

export default class LeaderBoardController {
  public static async performanceInformation(_req: Request, res: Response): Promise<Response> {
    const performance = await LeaderBoardService.performanceInformation();
    return res.status(200).json(performance);
  }
}
