import { NextFunction, Request, Response } from 'express';
import ValidateUserTokenService from '../services/ValidateUserTokenService';

interface IAuthenticateJwtMiddlewareResponse extends Request {
  token?: {
    id: string;
    email: string;
  };
}

export default class AuthenticateJwtMiddleware {
  middleware(
    request: IAuthenticateJwtMiddlewareResponse,
    response: Response,
    next: NextFunction
  ): Response | void {
    const token = request.headers.authorization?.split(' ')[1];

    if (!token) {
      return response
        .status(401)
        .json({ message: 'You must be authenticated to access this route.' });
    }

    const validateUserTokenService = new ValidateUserTokenService();

    const isValidToken = validateUserTokenService.execute(token);

    if (!isValidToken) return response.status(401).json({ message: 'Invalid token.' });

    if (!request.token) {
      request.token = {
        id: isValidToken.id,
        email: isValidToken.email,
      };
    }

    return next();
  }
}
