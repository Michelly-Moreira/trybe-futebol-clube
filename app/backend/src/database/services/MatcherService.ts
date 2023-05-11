import MatcherModel, { MatcherAtributes, MatcherCreationAtributes } from '../models/MatcherModel';

class MatcherService {
  public static async create(matches: MatcherCreationAtributes): Promise<MatcherAtributes> {
    const matcherCreated = await MatcherModel.create(matches);
    return matcherCreated.toJSON();
  }
}

export default MatcherService;
