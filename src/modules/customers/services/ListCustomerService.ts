import { inject, injectable } from 'tsyringe';
import { ICustomer } from '../domain/models/ICustomer';
import { ICustomerRepository } from '../domain/repositories/ICustomerRepository';

@injectable()
export default class ListCustomerService {
  constructor(
    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute(): Promise<ICustomer[] | undefined> {
    const customers = await this.customerRepository.findAll();

    return customers;
  }
}
