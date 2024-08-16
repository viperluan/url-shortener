import { PrismaClient } from '@prisma/client';
import { config } from '../utils/config';
import jwt from 'jsonwebtoken';

type AuthenticateUserTokenDTO = {
  token: string;
};

export default class AuthenticateUserService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(id: string, email: string): Promise<AuthenticateUserTokenDTO | null> {
    const payload = {
      id,
      email,
    };

    const token = jwt.sign(payload, config.jwtSecretKey, { expiresIn: '24h' });

    return { token };
  }
}
