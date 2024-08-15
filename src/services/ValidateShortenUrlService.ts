import { PrismaClient } from '@prisma/client';

export default class ValidateShortenUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(url: string) {
    const shortenUrl = await this.prisma.uRL.findFirst({ where: { shorten: url } });

    if (!shortenUrl) return null;

    return shortenUrl;
  }
}
