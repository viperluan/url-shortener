export default class Url {
  constructor(
    readonly id: string,
    readonly original: string,
    readonly shorten: string,
    readonly clicks: number,
    readonly userId?: string | null | undefined
  ) {}

  public generateUrlWithDomain(
    protocol: string,
    host: string = 'localhost',
    baseUrl: string,
    shortenUrl: string
  ): string {
    const link = `${protocol}://${host}${baseUrl}/${shortenUrl}`;

    return link;
  }
}
