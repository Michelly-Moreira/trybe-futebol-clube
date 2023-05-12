import { Request, Response } from 'express';
// import { TeamAtributes } from '../models/TeamModel';
import TeamService from '../services/TeamService';

export default class TeamController {
  public static findAll = async (req: Request, res: Response): Promise<Response> => {
    const teams = await TeamService.findAll();
    return res.status(200).json(teams);
  };
}
