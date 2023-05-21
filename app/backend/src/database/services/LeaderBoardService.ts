import { MatchAtributes } from '../models/MatchModel';
import MatchService from './MatchService';
import TeamService from './TeamService';

// a tabela tem as chaves name: TeamName de awaiTeam ou homeTeam em Matches, totalPoints, totalGames: matches.length, total Victories,
// totalDraws, totalLosses, goalsFavor, goalsOwn

export default class LeaderBoardService {
  static async performanceInformation(value: string) {
    const allTeams = await TeamService.findAll();

    return Promise.all(allTeams.map(async (team) => {
      const matches = value === 'home' ? await MatchService.getHomeById(team.id)
        : await MatchService.getAwayById(team.id);
      return {
        name: team.teamName,
        totalGames: matches.length,
        goalsFavor: this.getGoalsFavor(matches, value),
      };
    }));
  }

  public static getGoalsFavor(matches: MatchAtributes[], typeTeam: string) {
    // gols marcados (home x away)
    if (typeTeam === 'home') {
      const resultGoalsFavorHome = matches.reduce((acc, goal) =>
      // homeTeamGols da tabela matches => qtd de gols feitos pelo time da casa naquela partida
        acc + goal.homeTeamGoals, 0);
      return resultGoalsFavorHome;
    }
    if (typeTeam === 'away') {
      const resultGoalsFavorAway = matches.reduce((acc, goal) =>
      // awaitTeamGols da tabela matches => qtd de gols feitos pelo time visitante naquela partida
        acc + goal.awayTeamGoals, 0);
      return resultGoalsFavorAway;
    }
  }

  public static getGoalsOwn(matches: MatchAtributes[], typeTeam: string) {
    // Gols sofridos (home x away)
    if (typeTeam === 'home') {
      const resultGoalsOwnHome = matches.reduce((acc, goal) =>
        acc + goal.awayTeamGoals, 0);
      return resultGoalsOwnHome;
    }
    if (typeTeam === 'away') {
      const resultGoalsOwnAway = matches.reduce((acc, goal) =>
        acc + goal.homeTeamGoals, 0);
      return resultGoalsOwnAway;
    }
  }
}

/*  public static getGoalsBalance() {
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
  } */
