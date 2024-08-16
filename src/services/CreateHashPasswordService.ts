import bcrypt from 'bcrypt';

export default class CreateHashPasswordService {
  constructor(readonly saltRounds = 10) {}

  async execute(password: string): Promise<string | null> {
    const hashedPassword = await this.hashPassword(password);

    return hashedPassword;
  }

  private async hashPassword(plainPassword: string): Promise<string | null> {
    try {
      const hash = await bcrypt.hash(plainPassword, this.saltRounds);

      return hash;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
}
