import { PrismaClient } from '@prisma/client';

export default class DeleteUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(urlId: string, userId: string) {
    const findUrl = await this.prisma.url.findFirst({
      where: { id: urlId, userId, deletedAt: null },
    });

    if (!findUrl) return null;

    return await this.prisma.url.update({
      where: { id: urlId },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
