import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class userController {
  public static async signin(req: Request, res: Response): Promise<Response> {
    try {
      const { email, password } = req.body;
      const login = await UserService.signin({ email, password });
      return res.status(200).json({ token: login });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  }

  public static async getRole(req: Request, res: Response): Promise<Response> {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }
    try {
      const role = await UserService.getRole(authorization);
      return res.status(200).json({ role });
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
  }
}
