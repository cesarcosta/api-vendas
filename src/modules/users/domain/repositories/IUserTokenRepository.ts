import { IUserToken } from '../models/IUserToken';

export interface IUserTokenRepository {
  findByToken(token: string): Promise<IUserToken | undefined>;

  generate(user_id: string): Promise<IUserToken>;
}
