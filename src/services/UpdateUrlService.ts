import { PrismaClient } from '@prisma/client';

export default class UpdateUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(id: string, newOriginalUrl: string) {
    return await this.prisma.url.update({
      where: { id },
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
