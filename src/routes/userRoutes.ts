import { Router } from 'express';
import UserController from '../controllers/UserController';
import AuthenticateJwtMiddleware from '../middlewares/AuthenticateJwtMiddleware';

const userRoutes = Router();

const authenticateJwtMiddleware = new AuthenticateJwtMiddleware();
const userController = new UserController();

userRoutes.get('/', authenticateJwtMiddleware.middleware, userController.getUserData);
userRoutes.post('/', userController.createUser);

export default userRoutes;
