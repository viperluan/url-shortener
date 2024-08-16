import { PrismaClient } from '@prisma/client';
import Url from '../models/Url';

export default class GetUrlListService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(id: string): Promise<Url[] | null> {
    const getUrlList = await this.prisma.url.findMany({
      where: { userId: id, deletedAt: null },
    });

    if (!getUrlList) return null;

    const urlList = getUrlList.map((url) => new Url(url.id, url.original, url.shorten, url.clicks));

    return urlList;
  }
}
