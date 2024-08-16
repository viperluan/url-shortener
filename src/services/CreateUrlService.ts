import { PrismaClient } from '@prisma/client';
import Url from '../models/Url';

export default class CreateUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(originalUrl: string, shortenUrl: string, userId: string | null): Promise<Url> {
    const createdUrl = await this.prisma.url.create({
      data: { original: originalUrl, shorten: shortenUrl, userId },
    });

    const url = new Url(createdUrl.id, createdUrl.original, createdUrl.shorten, createdUrl.clicks);

    return url;
  }
}
