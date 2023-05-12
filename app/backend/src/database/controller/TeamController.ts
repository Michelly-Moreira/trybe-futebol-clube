import { Request, Response } from 'express';
// import { TeamAtributes } from '../models/TeamModel';
import TeamService from '../services/TeamService';

export default class TeamController {
  public static findAll = async (req: Request, res: Response): Promise<Response> => {
    const teams = await TeamService.findAll();
    return res.status(200).json(teams);
  };

  public static findById = async (req: Request, res: Response): Promise<Response | undefined> => {
    const { id } = req.params;
    const teams = await TeamService.findById(Number(id));
    return res.status(200).json(teams);
  };
}
