import { Router } from 'express';
import UrlController from '../controllers/UrlController';
import AuthenticateJwtMiddleware from '../middlewares/AuthenticateJwtMiddleware';

const urlRoutes = Router();

const authenticateJwtMiddleware = new AuthenticateJwtMiddleware();

const urlController = new UrlController();

urlRoutes.head('/:shortenedUrl', authenticateJwtMiddleware.middleware, urlController.headUrl);
urlRoutes.options('/', authenticateJwtMiddleware.middleware, urlController.optionsUrl);

urlRoutes.get('/:shortenedUrl', urlController.getShortenedUrl);
urlRoutes.get('/', authenticateJwtMiddleware.middleware, urlController.getUrls);
urlRoutes.post('/', urlController.createUrl);
urlRoutes.patch('/', authenticateJwtMiddleware.middleware, urlController.updateUrl);
urlRoutes.delete('/:shortenedUrl', authenticateJwtMiddleware.middleware, urlController.deleteUrl);

export default urlRoutes;
