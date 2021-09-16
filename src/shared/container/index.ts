import { container } from 'tsyringe';

import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import CustomerRepository from '@modules/customers/infra/typeorm/repositories/CustomerRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import ProductRepository from '@modules/products/infra/typeorm/repositories/ProductRepository';

container.registerSingleton<ICustomerRepository>('CustomerRepository', CustomerRepository);

container.registerSingleton<IProductRepository>('ProductRepository', ProductRepository);
