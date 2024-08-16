import { Request, Response } from 'express';
import AuthenticateUserService from '../services/AuthenticateUserService';
import GetUserWithPasswordService from '../services/GetUserWithPasswordService';
import CompareHashedPasswordService from '../services/CompareHashedPasswordService';

export default class AuthenticateController {
  async authenticate(request: Request, response: Response) {
    const { email, password } = request.body;
    if (!email || !password) return response.status(400).end();

    const getUserWithPasswordService = new GetUserWithPasswordService();
    const getUser = await getUserWithPasswordService.execute(email);

    if (!getUser) return response.status(400).end();

    const compareHashedPasswordService = new CompareHashedPasswordService();
    const comparedPasswords = await compareHashedPasswordService.execute(
      password,
      getUser.password
    );

    if (!comparedPasswords) return response.status(400).end();

    const authenticateUserService = new AuthenticateUserService();
    const authenticateToken = await authenticateUserService.execute(getUser.id, getUser.email);

    if (!authenticateToken) return response.status(400).end();

    return response.status(200).json(authenticateToken);
  }
}
