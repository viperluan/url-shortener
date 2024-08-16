import { PrismaClient } from '@prisma/client';

export default class UpdateClickUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(urlId: string) {
    const updatedClickUrl = await this.prisma.url.update({
      where: { id: urlId },
      data: {
        clicks: { increment: 1 },
      },
    });

    return updatedClickUrl;
  }
}
