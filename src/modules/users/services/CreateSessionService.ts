import AppError from '@shared/errors/AppError';
import { compare } from 'bcryptjs';
import { sign } from 'jsonwebtoken';
import { getCustomRepository } from 'typeorm';
import User from '../typeorm/entities/User';
import UserRepository from '../typeorm/repositories/UserRepository';

interface IRequest {
  email: string;
  password: string;
}

interface IResponse {
  user: User;
  token: string;
}

export default class CreateSessionService {
  public async execute({ email, password }: IRequest): Promise<IResponse> {
    const userRepository = getCustomRepository(UserRepository);

    const user = await userRepository.findByEmail(email);

    if (!user) {
      throw new AppError('Incorrect email/passwod combination!', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/passwod combination!', 401);
    }

    const token = sign({}, '45ee3c2484b388c1c9b521c45afe3a3e', {
      subject: user.id,
      expiresIn: '1d',
    });

    return { user, token };
  }
}
// 45ee3c2484b388c1c9b521c45afe3a3e
