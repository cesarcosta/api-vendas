import { Request, Response } from 'express';
import { container } from 'tsyringe';
import CreateOrderService from '../../../services/CreateOrderService';
import ShowOrderService from '../../../services/ShowOrderService';

export default class OrderController {
  public async show(request: Request, response: Response): Promise<Response> {
    const { id } = request.params;

    const showOrderService = container.resolve(ShowOrderService);

    const order = await showOrderService.execute({ id });

    return response.status(200).json(order);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { customer_id, products } = request.body;

    const createOrderService = container.resolve(CreateOrderService);

    const order = await createOrderService.execute({ customer_id, products });

    return response.status(201).json(order);
  }
}
