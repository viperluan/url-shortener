import jwt from 'jsonwebtoken';
import { config } from '../utils/config';

interface IValidateUserTokenServiceDTO {
  id: string;
  email: string;
}

export default class ValidateUserTokenService {
  execute(token: string): IValidateUserTokenServiceDTO | null {
    try {
      const decodedToken = jwt.verify(token, config.jwtSecretKey) as IValidateUserTokenServiceDTO;

      return decodedToken;
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      return null;
    }
  }
}
