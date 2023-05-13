import * as bcrypt from 'bcryptjs';
import UserModel from '../models/UserModel';
import Auth from '../utils/Auth';

// signin  -> Se usuário já cadastrado retorna o token
export default class UserService {
  public static async signin(users: { email: string, password: string }): Promise<string> {
    const login = await UserModel.findOne({
      where: { email: users.email },
    });
    if (!login || !bcrypt.compareSync(users.password, login.dataValues.password)) {
      throw new Error();
    }
    const { email, role } = login.dataValues;
    const token = Auth.generateToken({ email, role }); // email e role farão parte da chave token
    return token;
  }
}
