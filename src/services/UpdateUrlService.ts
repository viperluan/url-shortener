import { PrismaClient } from '@prisma/client';

export default class UpdateUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(id: string, newOriginalUrl: string, userId: string) {
    const findUrl = await this.prisma.url.findFirst({ where: { id, userId, deletedAt: null } });

    if (!findUrl) return null;

    return await this.prisma.url.update({
      where: { id, userId },
      data: {
        original: newOriginalUrl,
      },
      select: {
        original: true,
        shorten: true,
        clicks: true,
      },
    });
  }
}
