export default class User {
  constructor(
    readonly email: string,
    readonly id?: string,
    readonly password?: string
  ) {}
}
