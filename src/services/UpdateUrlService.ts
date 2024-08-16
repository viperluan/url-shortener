import { PrismaClient } from '@prisma/client';
import Url from '../models/Url';

export default class UpdateUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(urlId: string, newOriginalUrl: string, userId?: string): Promise<Url> {
    const updatedUrl = await this.prisma.url.update({
      where: { id: urlId, userId },
      data: {
        original: newOriginalUrl,
      },
    });

    const url = new Url(updatedUrl.id, updatedUrl.original, updatedUrl.shorten, updatedUrl.clicks);

    return url;
  }
}
