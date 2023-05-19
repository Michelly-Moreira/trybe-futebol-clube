import { MatchAtributes } from '../models/MatchModel';
import MatchService from './MatchService';
// import TeamService from './TeamService';

// trazendo os times com as partidas finalizadas, excluindo chaves que não são necessárias para LeaderBoard

export default class LeaderBoardService {
  static async performanceInformation() {
    // allTeams = await TeamService.findAll();
    const allMatchesFinished = await MatchService.filterMatch(false); // somente partidas finalizadas { inProgress: false }
    const homeGoalsFavor = LeaderBoardService.getGoalsFavor('home', allMatchesFinished);
    console.log(homeGoalsFavor);
  // a tabela tem as chaves name: TeamName de awaiTeam ou homeTeam em Matches, totalPoints, totalGames: matches.length, total Victories,
  // totalDraws, totalLosses, goalsFavor, goalsOwn
  }

  // awaitTeamGols da tabela matches => qtd de gols feitos pelo time visitante naquela partida
  // homeTeamGols da tabela matches => qtd de gols feitos pelo time da casa naquela partida

  public static getGoalsFavor(team: string, matches: MatchAtributes[]) {
    // Gols marcados no time adversário (home x away)
    if (team === 'home') {
      const resultGoalsFavorHome = matches.reduce((acc, goal) =>
        acc + goal.homeTeamGoals, 0);
      return resultGoalsFavorHome;
    }
    if (team === 'away') {
      const resultGoalsFavorAway = matches.reduce((acc, goal) =>
        acc + goal.awayTeamGoals, 0);
      return resultGoalsFavorAway;
    }
  }

  public static getGoalsOwn(team: string, matches: MatchAtributes[]) {
    // Gols sofridos (home x away)
    if (team === 'home') {
      const resultGoalsOwnHome = matches.reduce((acc, goal) =>
        acc + goal.awayTeamGoals, 0);
      return resultGoalsOwnHome;
    }
    if (team === 'away') {
      const resultGoalsOwnAway = matches.reduce((acc, goal) =>
        acc + goal.homeTeamGoals, 0);
      return resultGoalsOwnAway;
    }
  }

  public static getGoalsBalance() {
    // saldo total de gols (goalsFavor - goalsOwn)
  }

  public static getTotalDraws() {
  // total de empates, ambos ganham +1pt
  }

  public static getTotalVictories() {
  // total de vitórias, o time vitórioso da partida ganha +3pts a cada vitória
  }

  public static getTotalLosses() {
    // total de derrotas, o time derrotado não ganha ponto
  }

  public static getTotalPoints() {
  // total de pontos, em ordem decrescente
  }

  public static PercentEfficiency() {
  // aproveitamento do time => [total de pontos / (totalGames*3)*100]
  }
}
/*   static async performanceInformation(): Promise<MatchAtributes[]> {
    const match = await MatchModel.findAll({
      where: { inProgress: false },
      include: [
        { model: TeamModel,
          as: 'homeTeam',
          attributes: {
            exclude: ['id', 'homeTeamId', 'awayTeamId'],
          },
        },
        { model: TeamModel,
          as: 'awayTeam',
          attributes: {
            exclude: ['id', 'homeTeamId', 'awayTeamId'],
          },
        },
      ],
    });
    return match;
  }  */
