import { PrismaClient } from '@prisma/client';

type ListDataUserServiceDTO = {
  id: string;
  email: string;
};

export default class ListDataUserService {
  readonly prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute({ id }: ListDataUserServiceDTO) {
    const user = await this.prisma.user.findFirst({
      where: { id },
      select: {
        email: true,
        urls: true,
      },
    });

    return user;
  }
}
