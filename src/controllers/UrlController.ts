import { Request, Response } from 'express';
import CreateUrlService from '../services/CreateUrlService';
import ValidateUserTokenService from '../services/ValidateUserTokenService';
import ValidateShortenUrlService from '../services/ValidateShortenUrlService';
import CountClickShortenUrlService from '../services/CountClickShortenUrlService';
import UpdateUrlService from '../services/UpdateUrlService';
import DeleteUrlService from '../services/DeleteUrlService';

interface IUrlControllerRequest extends Request {
  token?: {
    id: string;
    email: string;
  };
}

export default class UrlController {
  async createUrl(request: IUrlControllerRequest, response: Response) {
    const { url } = request.body;

    if (!url) return response.status(401).json({ message: 'You need to provide a URL to short.' });

    const token = request.headers.authorization?.split(' ')[1];
    let userId = null;

    if (token) {
      const validateUserTokenService = new ValidateUserTokenService();
      const payload = validateUserTokenService.execute(token);

      if (payload) {
        userId = payload.id;
      }
    }

    const createUrlService = new CreateUrlService();
    const createdUrl = await createUrlService.execute(url, userId);

    const domain = `${request.protocol}://${request.get('host')}/`;
    const createdUrlWithDomain = {
      shortenUrl: domain + createdUrl.shorten,
    };

    return response.status(201).json(createdUrlWithDomain);
  }

  async getUrl(request: Request, response: Response) {
    const { url } = request.params;

    const validateShortenUrlService = new ValidateShortenUrlService();
    const shortenUrl = await validateShortenUrlService.execute(url);

    if (!shortenUrl) return response.status(401).json({ message: 'Invalid URL.' });

    const countClickShortenUrlService = new CountClickShortenUrlService();
    await countClickShortenUrlService.execute(shortenUrl.id);

    return response.redirect(shortenUrl.original);
  }

  async editUrl(request: Request, response: Response) {
    const { id, newOriginalUrl } = request.body;

    if (!id) return response.status(401).json({ message: 'You must provide a ID.' });

    const updateUrlService = new UpdateUrlService();

    const updatedUrl = await updateUrlService.execute(id, newOriginalUrl);

    return response.json(updatedUrl);
  }

  async deleteUrl(request: Request, response: Response) {
    const { id } = request.params;

    if (!id) return response.status(401).json({ message: 'You must provide a ID.' });

    const deleteUrlService = new DeleteUrlService();
    const deletedUrl = await deleteUrlService.execute(id);

    if (!deletedUrl) return response.status(401).json({ message: 'ID not found.' });

    return response.status(200).json();
  }
}
