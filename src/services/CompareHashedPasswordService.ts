import bcrypt from 'bcrypt';

export default class CompareHashedPasswordService {
  async execute(password: string, hashedPassword: string): Promise<boolean> {
    const passwordMatch = await this.verifyPassword(password, hashedPassword);

    return passwordMatch;
  }

  private async verifyPassword(plainPassword: string, hash: string): Promise<boolean> {
    try {
      const match = await bcrypt.compare(plainPassword, hash);

      return match;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return false;
    }
  }
}
