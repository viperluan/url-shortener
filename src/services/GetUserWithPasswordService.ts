import { PrismaClient } from '@prisma/client';
import User from '../models/User';

export default class GetUserWithPasswordService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(email: string): Promise<Required<User> | null> {
    const getUser = await this.prisma.user.findFirst({ where: { email } });

    if (!getUser) return null;

    const user = new User(getUser.email, getUser.id, getUser.password);

    return user as Required<User>;
  }
}
