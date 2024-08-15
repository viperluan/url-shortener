import { PrismaClient } from '@prisma/client';

export default class ListDataUserService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(id: string) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: {
        email: true,
        urls: {
          where: {
            deletedAt: null,
          },
          select: {
            id: true,
            original: true,
            shorten: true,
            clicks: true,
            updatedAt: true,
          },
        },
      },
    });

    return user;
  }
}
