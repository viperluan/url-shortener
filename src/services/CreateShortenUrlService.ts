export default class CreateShortenUrlService {
  async execute(): Promise<string> {
    const { nanoid } = await import('nanoid');

    return nanoid(6);
  }
}
