import { Router } from 'express';
import UrlController from '../controllers/UrlController';

const urlRoutes = Router();

const urlController = new UrlController();

urlRoutes.get('/:url', urlController.getUrl);
urlRoutes.post('/shorten', urlController.createUrl);
urlRoutes.put('/shorten', urlController.editUrl);
urlRoutes.delete('/shorten/:id', urlController.deleteUrl);

export default urlRoutes;
