import { MatchAtributes } from '../models/MatchModel';
import MatchService from './MatchService';
import TeamService from './TeamService';

// a tabela tem as chaves name: TeamName de awaiTeam ou homeTeam em Matches, totalPoints, totalGames: matches.length, total Victories,
// totalDraws, totalLosses, goalsFavor, goalsOwn

export default class LeaderBoardService {
  static async performanceInformation(typeTeam: string) {
    const allTeams = await TeamService.findAll();

    return Promise.all(allTeams.map(async (team) => {
      const matches = typeTeam === 'home' ? await MatchService.getHomeById(team.id)
        : await MatchService.getAwayById(team.id);
      return {
        name: team.teamName,
        totalPoints: typeTeam === 'home' ? this.getTotalHomePoints(matches)
          : this.getTotalAwayPoints(matches),
        totalGames: matches.length,
        totalVictories: this.getTotalVictories(matches, typeTeam),
        totalDraws: this.getTotalDraws(matches, typeTeam),
        totalLosses: this.getTotalLosses(matches, typeTeam),
        goalsFavor: this.getGoalsFavor(matches, typeTeam),
        goalsOwn: this.getGoalsOwn(matches, typeTeam),
        goalsBalance: this.getGoalsBalance(matches, typeTeam),
        efficiency: this.PercentEfficiency(matches, typeTeam),
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

  public static getGoalsBalance(matches: MatchAtributes[], typeTeam: string) {
    // saldo total de gols (goalsFavor - goalsOwn)
    if (typeTeam === 'home') {
      const goalsBalanceHome = matches.reduce((_acc, goal) =>
        goal.homeTeamGoals - goal.awayTeamGoals, 0);
      return goalsBalanceHome;
    }
    if (typeTeam === 'away') {
      const goalsBalanceAway = matches.reduce((_acc, goal) =>
        goal.awayTeamGoals - goal.homeTeamGoals, 0);
      return goalsBalanceAway;
    }
  }

  // calcula quem ganhou e soma uma vitória ao time vencedor
  public static getTotalVictories(matches: MatchAtributes[], typeTeam: string) {
    if (typeTeam === 'home') {
      const totalVictoriesHome = matches.reduce((acc, goal) =>
        (goal.homeTeamGoals > goal.awayTeamGoals ? acc + 1 : acc), 0);
      return totalVictoriesHome;
    }
    if (typeTeam === 'away') {
      const totalVictoriesAway = matches.reduce((acc, goal) =>
        (goal.awayTeamGoals > goal.homeTeamGoals ? acc + 1 : acc), 0);
      return totalVictoriesAway;
    }
  }

  // calculando empates, soma um empate pro time
  public static getTotalDraws(matches: MatchAtributes[], typeTeam: string) {
    if (typeTeam === 'home') {
      const totalDrawsHome = matches.reduce((acc, goal) =>
        (goal.homeTeamGoals === goal.awayTeamGoals ? acc + 1 : acc), 0);
      return totalDrawsHome;
    }
    if (typeTeam === 'away') {
      const totalDrawsAway = matches.reduce((acc, goal) =>
        (goal.awayTeamGoals === goal.homeTeamGoals ? acc + 1 : acc), 0);
      return totalDrawsAway;
    }
  }

  // calculando derrotas entre os times da casa e os times visitantes
  public static getTotalLosses(matches: MatchAtributes[], typeTeam: string) {
    if (typeTeam === 'home') {
      const totalLossesHome = matches.reduce((acc, goal) =>
        (goal.homeTeamGoals < goal.awayTeamGoals ? acc + 1 : acc), 0);
      return totalLossesHome;
    }
    if (typeTeam === 'away') {
      const totalLossesAway = matches.reduce((acc, goal) =>
        (goal.awayTeamGoals < goal.homeTeamGoals ? acc + 1 : acc), 0);
      return totalLossesAway;
    }
  }

  // TOTAL DE PONTOS dos times da casa, em ordem decrescente
  // total de vitórias, o time vitórioso da partida ganha +3pts a cada vitória
  // total de empates, ambos ganham +1pt
  // total de derrotas, o time derrotado não ganha ponto
  public static getTotalHomePoints(matches: MatchAtributes[]) {
    const totalPoints = matches.reduce((total, goal) => {
      if (goal.homeTeamGoals > goal.awayTeamGoals) {
        const points = total + 3;
        return points;
      }
      if (goal.homeTeamGoals < goal.awayTeamGoals) {
        return total;
      }
      return total + 1;
    }, 0);
    return totalPoints;
  }

  public static getTotalAwayPoints(matches: MatchAtributes[]) {
    // total de pontos dos times visitantes, em ordem decrescente
    const totalPoints = matches.reduce((total, goal) => {
      if (goal.awayTeamGoals > goal.homeTeamGoals) {
        const points = total + 3;
        return points;
      }
      if (goal.awayTeamGoals < goal.homeTeamId) {
        return total;
      }
      return total + 1;
    }, 0);
    return totalPoints;
  }

  public static PercentEfficiency(matches: MatchAtributes[], typeTeam: string) {
  // aproveitamento do time => [total de pontos / (totalGames*3)*100]
    let totalPoints;
    const totalGames = matches.length;

    if (typeTeam === 'home') {
      totalPoints = this.getTotalHomePoints(matches);
    } else {
      totalPoints = this.getTotalAwayPoints(matches);
    }
    return ((totalPoints / (totalGames * 3)) * 100).toFixed(2);
  }
}
