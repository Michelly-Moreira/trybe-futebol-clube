import { Request, Response } from 'express';
import MatchService from '../services/MatchService';

export default class MatchController {
  // retorna as partidas filtradas e as partidas sem filtro que usam a mesma rota
  public static async findMatches(req: Request, res: Response): Promise<Response> {
    const { inProgress } = req.query;
    if (inProgress) {
      const progress = inProgress === 'true';
      const matches = await MatchService.filterMatch(progress);
      return res.status(200).json(matches);
    }
    const allMatches = await MatchService.getAllMatches();
    return res.status(200).json(allMatches);
  }

  public static async finishMatch(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const finished = await MatchService.finishMatch(+id);
    return res.status(200).json(finished);
  }

  public static async matchInProgress(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    const { homeTeamGoals, awayTeamGoals } = req.body;
    const activeMatch = await MatchService.matchInProgress(+id, { homeTeamGoals, awayTeamGoals });
    return res.status(200).json(activeMatch);
  }

  public static async create(req: Request, res: Response): Promise<Response> {
    const { homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals } = req.body;
    try {
      const createMatch = await MatchService.create({
        homeTeamId, awayTeamId, homeTeamGoals, awayTeamGoals, inProgress: true,
      });
      return res.status(201).json(createMatch);
    } catch (error) {
      return res.status(404).json({
        message: 'There is no team with such id!',
      });
    }
  }
}

// req.query sempre retorna string, para retornar valor boolean(linha 9):
// usando progress = req.query === 'true':
// se eu receber o req.query = 'false'=> req.query === 'true'? o retorno será  'false'.
// se eu receber o req.query = 'true'=> req.query === 'true'? o retorno será 'true'.
