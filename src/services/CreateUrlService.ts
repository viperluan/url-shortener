import { PrismaClient } from '@prisma/client';
import CreateShortenUrlService from './CreateShortenUrlService';

type CreateUrlServiceDTO = {
  id: string;
  original: string;
  shorten: string;
  clicks: number;
  createdAt: Date;
  updatedAt: Date;
  deletedAt: Date | null;
};

export default class CreateUrlService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(originalUrl: string, userId: string | null): Promise<CreateUrlServiceDTO> {
    const createShortenUrlService = new CreateShortenUrlService();

    const shortenUrl = createShortenUrlService.execute();

    const url = await this.prisma.url.create({
      data: { original: originalUrl, shorten: shortenUrl, userId },
    });

    return url;
  }
}
