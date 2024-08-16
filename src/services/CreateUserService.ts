import { PrismaClient } from '@prisma/client';
import User from '../models/User';

export default class CreateUserService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(email: string, password: string): Promise<User | null> {
    const createdUser = await this.prisma.user.create({
      data: { email, password },
    });

    if (!createdUser) return null;

    const user = new User(createdUser.email);

    return user;
  }
}
