import { nanoid } from 'nanoid';
export default class CreateShortenUrlService {
  execute(): string {
    return nanoid(6);
  }
}
