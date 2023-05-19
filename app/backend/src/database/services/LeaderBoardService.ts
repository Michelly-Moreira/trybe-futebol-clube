import MatchModel, { MatchAtributes } from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
// import MatchService from './MatchService';
// import TeamService from './TeamService';

// trazendo os times com as partidas finalizadas, excluindo chaves que não são necessárias para LeaderBoard

export default class LeaderBoardService {
  static async performanceInformation(): Promise<MatchAtributes[]> {
    const match = await MatchModel.findAll({
      where: { inProgress: false },
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
