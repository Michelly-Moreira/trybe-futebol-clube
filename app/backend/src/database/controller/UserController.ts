import { Request, Response } from 'express';
import UserService from '../services/UserService';

export default class userController {
  public static signin = async (req: Request, res: Response): Promise<Response> => {
    try {
      const { email, password } = req.body;
      const login = await UserService.signin({ email, password });
      return res.status(200).json({ token: login });
    } catch (error) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
  };
}
