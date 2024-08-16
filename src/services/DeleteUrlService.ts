import { PrismaClient } from '@prisma/client';

export default class DeleteUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(urlId: string, userId?: string | null | undefined) {
    const deletedUrl = await this.prisma.url.update({
      where: { id: urlId, userId },
      data: {
        deletedAt: new Date(),
      },
    });

    return deletedUrl;
  }
}
