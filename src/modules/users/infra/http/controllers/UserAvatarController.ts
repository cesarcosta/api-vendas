import { Request, Response } from 'express';
import { classToClass } from 'class-transformer';
import UpdateUserAvatarService from '../../../services/UpdateUserAvatarService';
import { container } from 'tsyringe';

export default class UserAvatarController {
  public async update(request: Request, response: Response): Promise<Response> {
    const updateUserAvatarService = container.resolve(UpdateUserAvatarService);

    const user = await updateUserAvatarService.execute({
      user_id: request.user.id,
      avatarFilename: request.file?.filename as string,
    });

    return response.status(201).json(classToClass(user));
  }
}
