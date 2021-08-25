import { Request, Response, Router } from 'express';

const routes = Router();

routes.get('/', (request: Request, response: Response) => {
  response.json({ message: 'Hello Dev!' });
});

export default routes;
