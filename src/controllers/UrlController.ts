import { Request, Response } from 'express';
import CreateUrlService from '../services/CreateUrlService';
import ValidateUserTokenService from '../services/ValidateUserTokenService';
import ValidateShortenUrlService from '../services/ValidateShortenUrlService';
import CountClickShortenUrlService from '../services/CountClickShortenUrlService';
import UpdateUrlService from '../services/UpdateUrlService';
import DeleteUrlService from '../services/DeleteUrlService';
import ListDataUserService from '../services/ListDataUserService';

interface IUrlControllerRequest extends Request {
  token?: {
    id: string;
    email: string;
  };
}

export default class UrlController {
  async getUrls(request: IUrlControllerRequest, response: Response) {
    if (!request.token) return response.status(401).send({});

    const listDataUserService = new ListDataUserService();
    const listUserData = await listDataUserService.execute(request.token.id);

    if (!listUserData) return response.status(401).send();

    return response.json(listUserData);
  }

  async getShortenUrl(request: Request, response: Response) {
    const { url } = request.params;

    const validateShortenUrlService = new ValidateShortenUrlService();
    const shortenUrl = await validateShortenUrlService.execute(url);

    if (!shortenUrl) return response.status(401).json({ message: 'Invalid URL.' });

    const countClickShortenUrlService = new CountClickShortenUrlService();
    await countClickShortenUrlService.execute(shortenUrl.id);

    return response.redirect(shortenUrl.original);
  }

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

    const domain = `${request.protocol}://${request.headers.host}${request.baseUrl}/`;
    const createdUrlWithDomain = {
      shortenUrl: domain + createdUrl.shorten,
    };

    return response.status(201).json(createdUrlWithDomain);
  }

  async editUrl(request: IUrlControllerRequest, response: Response) {
    const { id, newOriginalUrl } = request.body;
    const { id: userId } = request.token!;

    if (!id) return response.status(401).json({ message: 'You must provide a ID.' });

    const updateUrlService = new UpdateUrlService();
    const updatedUrl = await updateUrlService.execute(id, newOriginalUrl, userId);

    if (!updatedUrl) return response.status(401).json({ message: 'ID not found.' });

    return response.json(updatedUrl);
  }

  async deleteUrl(request: IUrlControllerRequest, response: Response) {
    const { id } = request.params;
    const { id: userId } = request.token!;

    if (!id) return response.status(401).json({ message: 'You must provide a ID.' });

    const deleteUrlService = new DeleteUrlService();
    const deletedUrl = await deleteUrlService.execute(id, userId);

    if (!deletedUrl) return response.status(401).json({ message: 'ID not found.' });

    return response.status(200).json();
  }
}
