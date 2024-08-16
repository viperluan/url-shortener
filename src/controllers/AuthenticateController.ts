import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class AuthenticateController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;
    if (!email || !password) return response.status(400).end();

    const authenticateUserService = new AuthenticateUserService();
    const authenticateToken = await authenticateUserService.execute(email, password);

    if (!authenticateToken) return response.status(400).end();

    return response.status(200).json(authenticateToken);
  }
}
