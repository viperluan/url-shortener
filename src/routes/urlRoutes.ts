import { Request, Response, Router } from 'express';

const urlRoutes = Router();

urlRoutes.post('/', (request: Request, response: Response) => {
  const { url } = request.body;

  return response.json({ url });
});

export default urlRoutes;
