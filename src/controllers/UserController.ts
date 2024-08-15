import { Request, Response } from 'express';
import CreateUserService from '../services/CreateUserService';

export default class UserController {
  async createUser(request: Request, response: Response) {
    const { email, password } = request.body;

    if (!email || !password) return response.json();

    const createUserService = new CreateUserService();
    const user = await createUserService.execute(email, password);

    if (!user) return response.status(401).json({ message: 'This email is already in use.' });

    return response.status(201).json(user);
  }
}
