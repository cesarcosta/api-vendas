import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  name: string;
  email: string;
}

export default class CreateCustomerService {
  public async execute({ name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists) {
      throw new AppError('There is already one customer with this email!');
    }

    const customer = customerRepository.create({ name, email });

    await customerRepository.save(customer);

    return customer;
  }
}
