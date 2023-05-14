import { Request, Response, NextFunction } from 'express';
import Auth from '../utils/Auth';

export default class TokenMiddleware {
  // caso o header não receba autorização(token)
  public static tokenValidation(req: Request, res: Response, next: NextFunction) {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: 'Token not found' });
    }

    // caso o token retornado não seja válido retorna este erro
    try {
      Auth.validateToken(authorization);
    } catch (error) {
      return res.status(401).json({ message: 'Token must be a valid token' });
    }
    return next();
  }
}
