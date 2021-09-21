import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IShowUser } from '../domain/models/IShowUser';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';

@injectable()
export default class ShowProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({ id }: IShowUser): Promise<IUser> {
    const user = await this.userRepository.findById(id);

    if (!user) {
      throw new AppError('User not found!', 400);
    }
    return user;
  }
}
