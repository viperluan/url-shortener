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
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(originalUrl: string): Promise<CreateUrlServiceDTO> {
    const createShortenUrlService = new CreateShortenUrlService();

    const shortenUrl = createShortenUrlService.execute();

    const createdUrl = await this.prisma.uRL.create({
      data: { original: originalUrl, shorten: shortenUrl },
    });

    return createdUrl;
  }
}
