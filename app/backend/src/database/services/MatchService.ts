import MatchModel, { MatchAtributes, MatchCreationAtributes } from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  public static async create(matches: MatchCreationAtributes): Promise<MatchAtributes> {
    const matchCreated = await MatchModel.create(matches);
    return matchCreated.toJSON();
  }

  // lista todas as partidas, com todos os dados
  public static async getAllMatches(): Promise<MatchAtributes[]> {
    const matches = await MatchModel.findAll({
      include: [
        { model: TeamModel,
          as: 'homeTeam',
          attributes: {
            exclude: ['id'],
          },
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: {
            exclude: ['id'],
          },
        },
      ],
    });
    return matches;
  }

  // lista as partidas filtradas, entre partidas finalizadas e partidas em andamento
  public static async filterMatch(inProgress: boolean): Promise<MatchAtributes[]> {
    const match = await MatchModel.findAll({
      where: { inProgress },
      include: [
        { model: TeamModel,
          as: 'homeTeam',
          attributes: {
            exclude: ['id'],
          },
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: {
            exclude: ['id'],
          },
        },
      ],
    });
    return match;
  }
}
