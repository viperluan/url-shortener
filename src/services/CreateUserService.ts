import { PrismaClient } from '@prisma/client';

type CreateUserServiceDTO = {
  id: string;
  email: string;
  password: string;
  createdAt: Date;
  updatedAt: Date;
};

export default class CreateUserService {
  prisma: PrismaClient;

  constructor() {
    this.prisma = new PrismaClient();
  }

  async execute(email: string, password: string): Promise<CreateUserServiceDTO> {
    const user = await this.prisma.user.create({ data: { email, password } });

    return user;
  }
}
