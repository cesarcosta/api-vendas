import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import { isAfter, addHours } from 'date-fns';
import UserRepository from '../typeorm/repositories/UserRepository';
import UserTokenRepository from '../typeorm/repositories/UserTokenRepository';
import { hash } from 'bcryptjs';

interface IRequest {
  token: string;
  password: string;
}

export default class ResetPasswordService {
  public async execute({ token, password }: IRequest): Promise<void> {
    const userRepository = getCustomRepository(UserRepository);
    const userTokenRepository = getCustomRepository(UserTokenRepository);

    const userToken = await userTokenRepository.findByToken(token);

    if (!userToken) {
      throw new AppError('UserToken not found!');
    }

    const user = await userRepository.findById(userToken.user_id);

    if (!user) {
      throw new AppError('User not found!');
    }

    const tokenCreatedAt = userToken.created_at;

    const compareDate = addHours(tokenCreatedAt, 2);

    if (isAfter(Date.now(), compareDate)) {
      throw new AppError('Token expired!');
    }

    user.password = await hash(password, 8);
    await userRepository.save(user);
  }
}
