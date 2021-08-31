import { Router } from 'express';
import { celebrate, Segments, Joi } from 'celebrate';
import multer from 'multer';
import isAuthenticated from '@shared/http/middlewares/isAuthenticated';
import UserController from '../controllers/UserController';
import UserAvatarController from '../controllers/UserAvatarController';
import uploadConfig from '@config/upload';

const usersRouter = Router();

const userControler = new UserController();

const userAvatarController = new UserAvatarController();

const upload = multer(uploadConfig);

usersRouter.get('/', isAuthenticated, userControler.index);

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name: Joi.string().required(),
      email: Joi.string().email().required(),
      password: Joi.string().required(),
    },
  }),
  userControler.create,
);

usersRouter.patch('/avatar', isAuthenticated, upload.single('avatar'), userAvatarController.update);

export default usersRouter;
