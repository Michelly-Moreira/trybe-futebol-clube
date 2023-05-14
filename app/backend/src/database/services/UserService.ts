// import * as bcrypt from 'bcryptjs'; importando desta forma precisa usar bcrypt.compareSync() ao invés de compareSync().

import { compareSync } from 'bcryptjs';
import UserModel from '../models/UserModel';
import Auth from '../utils/Auth';

// signin  -> Se usuário já cadastrado retorna o token
export default class UserService {
  public static async signin(users: { email: string, password: string }): Promise<string> {
    const login = await UserModel.findOne({
      where: { email: users.email },
    });
    if (!login || !compareSync(users.password, login.dataValues.password)) {
      throw new Error();
    }
    const { email, role } = login.dataValues;
    const token = Auth.generateToken({ email, role }); // email e role farão parte da chave token
    return token;
  }

  // se o token for vàlido retorna a role
  public static async getRole(email: string): Promise<string> {
    const validEmail = await UserModel.findOne({
      where: { email },
    });
    if (!validEmail) {
      throw new Error();
    }
    const { role } = validEmail.dataValues;
    return role;
  }
}
