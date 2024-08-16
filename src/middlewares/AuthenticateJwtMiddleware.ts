import { NextFunction, Request, Response } from 'express';
import ValidateUserTokenService from '../services/ValidateUserTokenService';

interface IAuthenticateJwtMiddlewareRequest extends Request {
  token?: {
    id: string;
    email: string;
  };
}

export default class AuthenticateJwtMiddleware {
  middleware(
    request: IAuthenticateJwtMiddlewareRequest,
    response: Response,
    next: NextFunction
  ): Response | void {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return response.status(401).end();
    }

    const validateUserTokenService = new ValidateUserTokenService();
    const isValidToken = validateUserTokenService.execute(token);

    if (!isValidToken) return response.status(401).end();

    request.token = {
      id: isValidToken.id,
      email: isValidToken.email,
    };

    return next();
  }
}
