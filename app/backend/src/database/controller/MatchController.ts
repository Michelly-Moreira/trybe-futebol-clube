import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  public static async getAllMatches(req: Request, res: Response): Promise<Response> {
    const matches = await MatchService.getAllMatches();
    return res.status(200).json(matches);
  }
}
