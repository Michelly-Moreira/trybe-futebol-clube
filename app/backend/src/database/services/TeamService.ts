import TeamModel, { TeamAtributes, TeamCreationAtributes } from '../models/TeamModel';

class TeamService {
  public static async create(teams: TeamCreationAtributes): Promise<TeamAtributes> {
    const teamCreated = await TeamModel.create(teams);
    return teamCreated.toJSON();
  }
}

export default TeamService;
