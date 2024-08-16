import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import GetUserService from '../services/GetUserService';

export default class UserController {
  async createUser(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) return response.status(400).end();

    const getUserService = new GetUserService();
    const getUser = await getUserService.execute(email);

    if (!getUser) return response.status(400).end();

    const createUserService = new CreateUserService();
    const user = await createUserService.execute(email, password);

    if (!user) return response.status(400).end();

    return response.status(201).json(user);
  }
}
