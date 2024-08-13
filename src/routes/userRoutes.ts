import { Request, Response, Router } from 'express';

const userRoutes = Router();

userRoutes.post('/', (request: Request, response: Response) => {
  const { email, password } = request.body;

  return response.json({ email, password });
});

export default userRoutes;
