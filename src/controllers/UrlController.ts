import { Request, Response } from 'express';
import CreateUrlService from '../services/CreateUrlService';
import UpdateUrlService from '../services/UpdateUrlService';
import DeleteUrlService from '../services/DeleteUrlService';
import GetUrlService from '../services/GetUrlService';
import GetUrlListService from '../services/GetUrlListService';
import UpdateClickUrlService from '../services/UpdateClickUrlService';
import CreateShortenUrlService from '../services/CreateShortenUrlService';

interface ITokenRequest extends Request {
  token?: {
    id: string;
    email: string;
  };
}

export default class UrlController {
  async headUrl(request: Request, response: Response) {
    const { shortenedUrl } = request.params;
    if (!shortenedUrl) return response.status(400).end();

    const getUrlService = new GetUrlService();
    const url = await getUrlService.execute(shortenedUrl);

    if (!url) return response.status(404).end();

    return response.status(200).end();
  }

  async optionsUrl(request: Request, response: Response) {
    response.set('Allow', 'HEAD, OPTIONS, GET, POST, PATCH, DELETE');

    return response.status(204).end();
  }

  async getShortenedUrl(request: Request, response: Response) {
    const { shortenedUrl } = request.params;
    if (!shortenedUrl) return response.status(400).end();

    const getUrlService = new GetUrlService();
    const url = await getUrlService.execute(shortenedUrl);

    if (!url) return response.status(400).end();

    const updateClickUrlService = new UpdateClickUrlService();
    await updateClickUrlService.execute(url.id);

    return response.redirect(url.original);
  }

  async getUrls(request: ITokenRequest, response: Response) {
    const getUrlListService = new GetUrlListService();
    const urlList = await getUrlListService.execute(request.token?.id);

    if (!urlList) return response.status(400).end();

    return response.json(urlList);
  }

  async createUrl(request: ITokenRequest, response: Response) {
    const { url } = request.body;
    if (!url) return response.status(400).end();

    const createShortenUrlService = new CreateShortenUrlService();
    const shortenedUrl = createShortenUrlService.execute();

    const createUrlService = new CreateUrlService();
    const createdUrl = await createUrlService.execute(url, shortenedUrl, request.token?.id);

    const link = createdUrl.generateUrlWithDomain(
      request.protocol,
      request.headers.host,
      request.baseUrl,
      shortenedUrl
    );

    return response.status(201).json({ link });
  }

  async updateUrl(request: ITokenRequest, response: Response) {
    const { shortenedUrl, newOriginalUrl } = request.body;
    if (!shortenedUrl) return response.status(400).end();

    const getUrlService = new GetUrlService();
    const getUrl = await getUrlService.execute(shortenedUrl);

    if (!getUrl) return response.status(400).end();

    const updateUrlService = new UpdateUrlService();
    const updatedUrl = await updateUrlService.execute(getUrl.id, newOriginalUrl, request.token?.id);

    if (!updatedUrl) return response.status(400).end();

    return response.json(updatedUrl);
  }

  async deleteUrl(request: ITokenRequest, response: Response) {
    const { shortenedUrl } = request.params;
    if (!shortenedUrl) return response.status(400).end();

    const getUrlService = new GetUrlService();
    const getUrl = await getUrlService.execute(shortenedUrl);

    if (!getUrl || getUrl.userId !== request.token?.id) return response.status(400).end();

    const deleteUrlService = new DeleteUrlService();
    const deletedUrl = await deleteUrlService.execute(getUrl.id, getUrl.userId);

    if (!deletedUrl) return response.status(400).end();

    return response.status(200).end();
  }
}
