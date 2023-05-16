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

  public static async addByIdd(req: Request, res: Response): Promise<Response> {
    const { id } = req.params;
    console.log(id);
  }
}

// req.query sempre retorna string, para retornar valor boolean(linha 9):
// usando progress = req.query === 'true':
// se eu receber o req.query = 'false'=> req.query === 'true'? o retorno será  'false'.
// se eu receber o req.query = 'true'=> req.query === 'true'? o retorno será 'true'.
