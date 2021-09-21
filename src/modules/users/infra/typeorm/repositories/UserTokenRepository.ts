import { IUserToken } from '@modules/users/domain/models/IUserToken';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';
import { getRepository, Repository } from 'typeorm';
import UserToken from '../entities/UserToken';

export default class UserTokenRepository implements IUserTokenRepository {
  private ormRepository: Repository<UserToken>;

  constructor() {
    this.ormRepository = getRepository(UserToken);
  }

  public async findByToken(token: string): Promise<IUserToken | undefined> {
    const userToken = await this.ormRepository.findOne({
      where: {
        token,
      },
    });
    return userToken;
  }

  public async generate(user_id: string): Promise<IUserToken> {
    const userToken = this.ormRepository.create({ user_id });

    await this.ormRepository.save(userToken);

    return userToken;
  }
}
