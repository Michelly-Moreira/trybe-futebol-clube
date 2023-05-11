import UserModel, { UserAtributes, UserCreationAtributes } from '../models/UserModel';

class UserService {
  public static async create(users: UserCreationAtributes): Promise<UserAtributes> {
    const userCreated = await UserModel.create(users);
    return userCreated.toJSON();
  }
}

export default UserService;
