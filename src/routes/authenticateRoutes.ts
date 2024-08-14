import { Router } from 'express';
import AuthenticateController from '../controllers/AuthenticateController';

const authenticateRoutes = Router();

const authenticateController = new AuthenticateController();

authenticateRoutes.post('/', authenticateController.authenticate);

export default authenticateRoutes;
