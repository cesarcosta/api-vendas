import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Customer from '../infra/typeorm/entities/Customer';
import CustomerRepository from '../infra/typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
}

export default class ShowCustomerService {
  public async execute({ id }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found!', 400);
    }
    return customer;
  }
}
