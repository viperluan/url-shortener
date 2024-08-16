import { Router } from 'express';
import UrlController from '../controllers/UrlController';
import AuthenticateJwtMiddleware from '../middlewares/AuthenticateJwtMiddleware';
import CheckIfExistsJwtMiddleware from '../middlewares/CheckIfExistsJwtMiddleware';

const urlRoutes = Router();

const authenticateJwtMiddleware = new AuthenticateJwtMiddleware();
const checkIfExistsJwtMiddleware = new CheckIfExistsJwtMiddleware();

const urlController = new UrlController();

urlRoutes.head('/:shortenedUrl', authenticateJwtMiddleware.middleware, urlController.headUrl);
urlRoutes.options('/', authenticateJwtMiddleware.middleware, urlController.optionsUrl);

urlRoutes.get('/:shortenedUrl', urlController.getShortenedUrl);
urlRoutes.get('/', authenticateJwtMiddleware.middleware, urlController.getUrls);
urlRoutes.post('/', checkIfExistsJwtMiddleware.middleware, urlController.createUrl);
urlRoutes.patch('/', authenticateJwtMiddleware.middleware, urlController.updateUrl);
urlRoutes.delete('/:shortenedUrl', authenticateJwtMiddleware.middleware, urlController.deleteUrl);

export default urlRoutes;
