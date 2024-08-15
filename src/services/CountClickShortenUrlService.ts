import { PrismaClient } from '@prisma/client';

export default class CountClickShortenUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(urlId: string) {
    const countClickUrl = await this.prisma.uRL.update({
      where: { id: urlId },
      data: {
        clicks: { increment: 1 },
      },
    });

    return countClickUrl;
  }
}
