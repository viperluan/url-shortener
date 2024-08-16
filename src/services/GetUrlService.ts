import { PrismaClient } from '@prisma/client';
import Url from '../models/Url';

export default class GetUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(shortenedUrl: string): Promise<Url | null> {
    const getUrl = await this.prisma.url.findFirst({ where: { shorten: shortenedUrl } });

    if (!getUrl) return null;

    const url = new Url(getUrl.id, getUrl.original, getUrl.shorten, getUrl.clicks, getUrl.userId);

    return url;
  }
}
