import { Request, Response, Router } from 'express';

const authenticateRoutes = Router();

authenticateRoutes.post('/', (request: Request, response: Response) => {
  const { email, password } = request.body;

  return response.json({ email, password });
});

export default authenticateRoutes;
