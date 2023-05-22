// import * as bcrypt from 'bcryptjs'; importando desta forma precisa usar bcrypt.compareSync() ao invés de compareSync().

import { compareSync } from 'bcryptjs';
import { JwtPayload } from 'jsonwebtoken';
import UserModel from '../models/UserModel';
import Auth from '../utils/Auth';

// signin  -> Se usuário já cadastrado retorna o token
export default class UserService {
  public static async signin(users: { email: string, password: string }): Promise<string> {
    console.log(users);
    const login = await UserModel.findOne({
      where: { email: users.email },
    }); console.log(login);
    if (!login || !compareSync(users.password, login.dataValues.password)) {
      console.log(compareSync(users.password, 'oi'));
      throw new Error();
    }
    const { email, role } = login.dataValues;
    const token = Auth.generateToken({ email, role }); // email e role farão parte da chave token
    return token;
  }

  // Verifica se o token é válido, se for vàlido retorna a role que está dentro do token
  public static async getRole(token: string): Promise<string | JwtPayload> {
    const payload = Auth.decodeToken(token);
    // console.log(payload);
    if (!payload) {
      throw new Error();
    }
    const { role } = payload;
    return role;
  }
}
