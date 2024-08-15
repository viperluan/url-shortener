import { PrismaClient } from '@prisma/client';
import { config } from '../utils/config';
import jwt from 'jsonwebtoken';

type AuthenticateUserServiceDTO = {
  token: string;
};

export default class AuthenticateUserService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(email: string, password: string): Promise<AuthenticateUserServiceDTO | null> {
    const findUser = await this.prisma.user.findFirst({ where: { email } });

    if (!findUser) return null;

    if (findUser?.password !== password) return null;

    const payload = {
      id: findUser.id,
      email: findUser.email,
    };

    const token = jwt.sign(payload, config.jwtSecretKey, { expiresIn: '24h' });

    return { token };
  }
}
