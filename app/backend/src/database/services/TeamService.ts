import TeamModel, { TeamAtributes } from '../models/TeamModel';

export default class TeamService {
  // lista todos os times
  public static async findAll(): Promise<TeamAtributes[]> {
    const teams = await TeamModel.findAll();
    return teams;
  }

  // busca um time pelo id
  public static async findById(id: number): Promise<TeamAtributes | null> {
    const teamFound = await TeamModel.findOne({
      where: { id },
    });
    return teamFound;
  }
}
