import { Request, Response } from 'express';
import CreateCustomerService from '../../../services/CreateCustomerService';
import DeleteCustomerService from '../../../services/DeleteCustomerService';
import ListCustomerService from '../../../services/ListCustomerService';
import ShowCustomerService from '../../../services/ShowCustomerService';
import UpdateCustomerService from '../../../services/UpdateCustomerService';

export default class CustomerController {
  public async index(request: Request, response: Response): Promise<Response> {
    const listCustomerService = new ListCustomerService();

    const customers = await listCustomerService.execute();

    return response.status(200).json(customers);
  }

  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showCustomerService = new ShowCustomerService();

    const customer = await showCustomerService.execute({ id });

    return response.status(200).json(customer);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { name, email } = request.body;

    const createCustomerService = new CreateCustomerService();

    const customer = await createCustomerService.execute({ name, email });

    return response.status(201).json(customer);
  }

  public async update(request: Request, response: Response): Promise<void> {
    const { id } = request.params;
    const { name, email } = request.body;

    const updateCustomerService = new UpdateCustomerService();

    await updateCustomerService.execute({ id, name, email });

    return response.status(204).end();
  }

  public async delete(request: Request, response: Response): Promise<void> {
    const { id } = request.params;

    const deleteCustomerService = new DeleteCustomerService();

    await deleteCustomerService.execute({ id });

    return response.status(204).end();
  }
}
