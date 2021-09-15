import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import Order from '../infra/typeorm/entities/Order';
import OrderRepository from '../infra/typeorm/repositories/OrderRepository';

interface IRequest {
  id: string;
}

export default class ShowOrderService {
  public async execute({ id }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);

    const order = await orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found!', 404);
    }

    return order;
  }
}
