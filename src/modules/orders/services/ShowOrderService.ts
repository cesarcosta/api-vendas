import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IOrder } from '../domain/models/IOrder';
import { IShowOrder } from '../domain/models/IShowOrder';

@injectable()
export default class ShowOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,
  ) {}

  public async execute({ id }: IShowOrder): Promise<IOrder> {
    const order = await this.orderRepository.findById(id);

    if (!order) {
      throw new AppError('Order not found!', 404);
    }

    return order;
  }
}
