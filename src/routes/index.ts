import { Router } from 'express';
import authenticateRoutes from './authenticateRoutes';
import urlRoutes from './urlRoutes';
import userRoutes from './userRoutes';

const routes = Router();

routes.use('/user', userRoutes);
routes.use('/authenticate', authenticateRoutes);
routes.use('/', urlRoutes);

export default routes;
