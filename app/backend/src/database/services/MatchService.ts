import MatchModel, { MatchAtributes, MatchCreationAtributes } from '../models/MatchModel';
import TeamModel from '../models/TeamModel';

export default class MatchService {
  public static async create(matches: MatchCreationAtributes): Promise<MatchAtributes> {
    const matchCreated = await MatchModel.create(matches);
    return matchCreated.toJSON();
  }

  // lista todas as partidas
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
    return matches.map((unic) => unic.toJSON());
  }
}
