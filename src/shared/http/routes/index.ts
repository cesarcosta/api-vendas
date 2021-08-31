import { Request, Response, Router } from 'express';
import productsRouter from '@modules/products/routes/products.routes';
import usersRouter from '@modules/users/routes/user.routes';
import sessionsRouter from '@modules/users/routes/session.routes';
import passwordRouter from '@modules/users/routes/password.routes';

const routes = Router();

routes.use('/products', productsRouter);
routes.use('/users', usersRouter);
routes.use('/sessions', sessionsRouter);
routes.use('/password', passwordRouter);

routes.get('/', (request: Request, response: Response) => {
  response.json({ message: 'Hello Dev!' });
});

export default routes;
