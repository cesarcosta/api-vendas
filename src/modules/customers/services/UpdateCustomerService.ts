import { getCustomRepository } from 'typeorm';
import { compare, hash } from 'bcryptjs';
import AppError from '@shared/errors/AppError';
import Customer from '../typeorm/entities/Customer';
import CustomerRepository from '../typeorm/repositories/CustomerRepository';

interface IRequest {
  id: string;
  name: string;
  email: string;
}

export default class UpdateCustomerService {
  public async execute({ id, name, email }: IRequest): Promise<Customer> {
    const customerRepository = getCustomRepository(CustomerRepository);

    const customer = await customerRepository.findById(id);

    if (!customer) {
      throw new AppError('Customer not found!', 400);
    }

    const customerExists = await customerRepository.findByEmail(email);

    if (customerExists && email != customer.email) {
      throw new AppError('There is already one customer with this email!');
    }

    customer.name = name;
    customer.email = email;
    await customerRepository.save(customer);

    return customer;
  }
}
