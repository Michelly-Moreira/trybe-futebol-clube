import { decode, JwtPayload, sign, SignOptions, verify } from 'jsonwebtoken';

const secretKey: string = process.env.JWT_SECRET as string || 'secret';

const configJTWT: SignOptions = {
  expiresIn: '7d', // o token gerado expira em 7 dias
  algorithm: 'HS256',
};

// gerando o token
export default class Auth {
  public static generateToken(payload: { email: string, role: string }): string {
    const token = sign(payload, secretKey, configJTWT);
    return token;
  }

  // verificando o token para validação
  public static validateToken(token: string) {
    const isValid = verify(token, secretKey);
    return isValid;
  }

  // decodificando para leitura do conteúdo do token
  public static decodeToken(token: string): JwtPayload {
    const decoded = decode(token);
    return decoded as JwtPayload;
  }
}
