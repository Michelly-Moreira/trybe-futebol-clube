import MatcherModel, { MatcherAtributes, MatcherCreationAtributes } from '../models/MatcherModel';

class MatcherService {
  public static async create(matches: MatcherCreationAtributes): Promise<MatcherAtributes> {
    const teamCreated = await MatcherModel.create(matches);
    return teamCreated.toJSON();
  }
}

export default MatcherService;
