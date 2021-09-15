import isAuthenticated from '@shared/infra/http/middlewares/isAuthenticated';
import { celebrate, Segments, Joi } from 'celebrate';
import { Router } from 'express';
import CustomerController from '../controllers/CustomerController';

const customersRouter = Router();

const customerController = new CustomerController();

customersRouter.use(isAuthenticated);

customersRouter.get('/', customerController.index);

customersRouter.get(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.show,
);

customersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.create,
);

customersRouter.put(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
    },
  }),
  customerController.update,
);

customersRouter.delete(
  '/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().uuid().required(),
    },
  }),
  customerController.delete,
);

export default customersRouter;
