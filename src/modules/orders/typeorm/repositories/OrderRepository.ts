import Customer from '@modules/customers/typeorm/entities/Customer';
import Product from '@modules/products/typeorm/entities/Product';
import { EntityRepository, Repository } from 'typeorm';
import Order from '../entitites/Order';

interface IRequest {
  customer: Customer;
  products: IProduct[];
}

interface IProduct {
  product_id: string;
  price: number;
  quantity: number;
}

@EntityRepository(Order)
export default class OrderRepository extends Repository<Order> {
  public async findById(id: string): Promise<Order | undefined> {
    const order = this.findOne(id, {
      relations: ['order_products', 'customer'],
    });
    return order;
  }

  public async createOrder({ customer, products }: IRequest): Promise<Order> {
    const order = this.create({
      customer,
      ordersProducts: products,
    });

    await this.save(order);

    return order;
  }
}
