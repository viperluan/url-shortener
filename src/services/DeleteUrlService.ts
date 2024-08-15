import { PrismaClient } from '@prisma/client';

export default class DeleteUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(urlId: string) {
    const findUrl = await this.prisma.uRL.findFirst({ where: { id: urlId } });

    if (!findUrl) return null;

    return await this.prisma.uRL.update({
      where: { id: urlId, deletedAt: null },
      data: {
        deletedAt: new Date(),
      },
    });
  }
}
