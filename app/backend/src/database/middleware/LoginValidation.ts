import { Request, Response, NextFunction } from 'express';

export default class LoginMiddleware {
  // Se não tiverem os campos email e login, aparece este erro
  public static loginValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ message: 'All fields must be filled' });
    }
    return next();
  }

  // se não tiverem valores válidos nos campos de login, aparece este erro
  public static userValidation(req: Request, res: Response, next: NextFunction) {
    const { email, password } = req.body;
    const rejex = /^[a-z0-9.]+@[a-z0-9]+\.([a-z]+)?$/i.test(email);

    if (password.length < 6) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    if (!rejex) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }
    return next();
  }
}
