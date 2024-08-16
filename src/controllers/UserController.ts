import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import GetUserService from '../services/GetUserService';
import CreateHashPasswordService from '../services/CreateHashPasswordService';

export default class UserController {
  async createUser(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) return response.status(400).end();

    const createHashPasswordService = new CreateHashPasswordService();
    const hashedPassword = await createHashPasswordService.execute(password);

    if (!hashedPassword) return response.status(400).end();

    const getUserService = new GetUserService();
    const userExists = await getUserService.execute(email);

    if (userExists) return response.status(400).end();

    const createUserService = new CreateUserService();
    const user = await createUserService.execute(email, hashedPassword);

    if (!user) return response.status(400).end();

    return response.status(201).end();
  }
}
