import { ICreateUser } from '../models/ICreateUser';
import { IUser } from '../models/IUser';

export interface IUserRepository {
  findAll(): Promise<IUser[]>;

  findByName(name: string): Promise<IUser | undefined>;

  findById(id: string): Promise<IUser | undefined>;

  findByEmail(email: string): Promise<IUser | undefined>;

  create(data: ICreateUser): Promise<IUser>;

  save(user: IUser): Promise<IUser>;
}
