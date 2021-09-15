import path from 'path';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import User from '../infra/typeorm/entities/User';
import UserRepository from '../infra/typeorm/repositories/UserRepository';
import upload from '@config/upload';
import fs from 'fs';

interface IRequest {
  user_id: string;
  avatarFilename: string;
}

export default class UpdateUserAvatarService {
  public async execute({ user_id, avatarFilename }: IRequest): Promise<User> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findOne(user_id);

    if (!user) {
      throw new AppError('User not found!', 404);
    }

    if (user.avatar) {
      const userAvatarFilePath = path.join(upload.directory, user.avatar);

      const userAvatarFileExists = await fs.promises.stat(userAvatarFilePath);

      if (userAvatarFileExists) {
        await fs.promises.unlink(userAvatarFilePath);
      }
    }

    user.avatar = avatarFilename;
    await userRepository.save(user);

    return user;
  }
}
