import { Router } from 'express';
import UrlController from '../controllers/UrlController';
import AuthenticateJwtMiddleware from '../middlewares/AuthenticateJwtMiddleware';

const urlRoutes = Router();

const authenticateJwtMiddleware = new AuthenticateJwtMiddleware();
const urlController = new UrlController();

urlRoutes.get('/:url', urlController.getShortenUrl);

urlRoutes.get('/', authenticateJwtMiddleware.middleware, urlController.getUrls);
urlRoutes.post('/', urlController.createUrl);
urlRoutes.patch('/', authenticateJwtMiddleware.middleware, urlController.editUrl);
urlRoutes.delete('/:id', authenticateJwtMiddleware.middleware, urlController.deleteUrl);

export default urlRoutes;
