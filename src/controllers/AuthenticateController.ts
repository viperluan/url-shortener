import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';

export default class AuthenticateController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) return response.json();

    const authenticateUserService = new AuthenticateUserService();

    const token = await authenticateUserService.execute(email, password);

    response.status(201).json(token);
  }
}
