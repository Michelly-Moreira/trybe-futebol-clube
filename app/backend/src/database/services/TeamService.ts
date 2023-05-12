import TeamModel, { TeamAtributes, TeamCreationAtributes } from '../models/TeamModel';

// criando um time
class TeamService {
  public static async create(teams: TeamCreationAtributes): Promise<TeamAtributes> {
    const teamCreated = await TeamModel.create(teams);
    return teamCreated.toJSON();
  }

  // lista todos os times
  public static async findAll(): Promise<TeamAtributes[]> {
    const teams = await TeamModel.findAll();
    return teams.map((team) => team.toJSON());
  }

  public static async findById(id: number): Promise<TeamAtributes | null> {
    const teamById = await TeamModel.findOne({ where: { id } });
    return teamById;
  }
}

export default TeamService;
