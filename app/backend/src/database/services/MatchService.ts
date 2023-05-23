import MatchModel, { MatchAtributes, MatchCreationAtributes } from '../models/MatchModel';
import TeamModel from '../models/TeamModel';
import TeamService from './TeamService';

export default class MatchService {
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

  // Finalizando uma partida
  public static async finishMatch(id: number): Promise<{ message: string }> {
    await MatchModel.update({ inProgress: false }, { where: { id } });
    return { message: 'Finished' };
  }

  // alterando os gols durante a partida(atualização)
  public static async matchInProgress(id: number, matches: {
    homeTeamGoals: number, awayTeamGoals: number }): Promise<{ message: string }> {
    await MatchModel.update(matches, { where: { id } });
    return { message: 'congratulations!' };
  }

  // cadastrando uma nova partida no banco de dados com validação
  public static async create(newMatch: MatchCreationAtributes): Promise<MatchAtributes | string> {
    const homeTeam = await TeamService.findById(newMatch.homeTeamId);
    const awayTeam = await TeamService.findById(newMatch.awayTeamId);
    if (!homeTeam || !awayTeam) {
      throw new Error();
    }
    const matchCreated = await MatchModel.create(newMatch);
    return matchCreated;
  }

  // buscando os times da casa com partidas finalizadas, pelo id.
  public static async getHomeById(id: number): Promise<MatchAtributes[]> {
    const allMatches = await MatchModel.findAll({
      where: { homeTeamId: id, inProgress: false },
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
    return allMatches;
  }

  // buscando os times visitantes com partidas finalizadas, pelo id.
  public static async getAwayById(id: number): Promise<MatchAtributes[]> {
    const allMatches = await MatchModel.findAll({
      where: { awayTeamId: id, inProgress: false },
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
    return allMatches;
  }
}
