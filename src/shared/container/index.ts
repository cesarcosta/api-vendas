import { container } from 'tsyringe';

import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';
import { IUserRepository } from '@modules/users/domain/repositories/IUserRepository';
import UserRepository from '@modules/users/infra/typeorm/repositories/UserRepository';
import UserTokenRepository from '@modules/users/infra/typeorm/repositories/UserTokenRepository';
import { IUserTokenRepository } from '@modules/users/domain/repositories/IUserTokenRepository';

container.registerSingleton<ICustomerRepository>('CustomerRepository', CustomerRepository);

container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);

container.registerSingleton<IUserRepository>('UserRepository', UserRepository);

container.registerSingleton<IUserTokenRepository>('UserTokenRepository', UserTokenRepository);
