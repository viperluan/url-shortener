import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import ListDataUserService from '../services/ListDataUserService';

interface IUserControllerRequest extends Request {
  token?: {
    id: string;
    email: string;
  };
}

export default class UserController {
  async createUser(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) return response.json();

    try {
      const createUserService = new CreateUserService();

      const user = await createUserService.execute(email, password);

      return response.status(201).json(user);
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        return response.status(401).json({ error: 'This email is already in use.' });
      }
    }
  }

  async getUserData(request: IUserControllerRequest, response: Response) {
    if (!request.token) return response.status(401).json({});

    const payload = {
      id: request.token.id,
      email: request.token.email,
    };

    const listDataUserService = new ListDataUserService();

    const listUserData = await listDataUserService.execute(payload);

    return response.json(listUserData);
  }
}
