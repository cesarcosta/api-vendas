import AppError from '@shared/errors/AppError';
import { compare, hash } from 'bcryptjs';
import { IUser } from '../domain/models/IUser';
import { IUserRepository } from '../domain/repositories/IUserRepository';
import { IUpdateProfile } from '../domain/models/IUpdateProfile';
import { inject, injectable } from 'tsyringe';

@injectable()
export default class UpdateProfileService {
  constructor(
    @inject('UserRepository')
    private userRepository: IUserRepository,
  ) {}

  public async execute({
    user_id,
    name,
    email,
    password,
    old_password,
  }: IUpdateProfile): Promise<IUser> {
    const user = await this.userRepository.findById(user_id);

    if (!user) {
      throw new AppError('User not found!', 400);
    }

    const userUpdatedEmail = await this.userRepository.findByEmail(email);

    if (userUpdatedEmail && userUpdatedEmail.id != user_id) {
      throw new AppError('There is already one user with this email!');
    }

    if (password && !old_password) {
      throw new AppError('Old password is required!');
    }

    if (password && old_password) {
      const checkOldPassword = await compare(old_password, user.password);

      if (!checkOldPassword) {
        throw new AppError('Old password does not match!');
      }

      user.password = await hash(password, 8);
    }

    user.name = name;
    user.email = email;
    await this.userRepository.save(user);

    return user;
  }
}
