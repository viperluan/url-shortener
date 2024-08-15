import { PrismaClient } from '@prisma/client';

type CreateUserServiceDTO = {
  email: string;
};

export default class CreateUserService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(email: string, password: string): Promise<CreateUserServiceDTO | null> {
    const findByEmail = await this.prisma.user.findFirst({ where: { email } });

    if (findByEmail) return null;

    const user = await this.prisma.user.create({
      data: { email, password },
      select: { email: true },
    });

    return user;
  }
}
