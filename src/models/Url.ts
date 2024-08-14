export default class Url {
  constructor(
    readonly original: string,
    readonly shorten: string,
    readonly clicks: number
  ) {}
}
