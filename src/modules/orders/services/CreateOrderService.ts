import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IOrderRepository } from '../domain/repositories/IOrderRepository';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { ICustomerRepository } from '@modules/customers/domain/repositories/ICustomerRepository';
import { IOrder } from '../domain/models/IOrder';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

@injectable()
export default class CreateOrderService {
  constructor(
    @inject('OrderRepository')
    private orderRepository: IOrderRepository,

    @inject('ProductRepository')
    private productRepository: IProductRepository,

    @inject('CustomerRepository')
    private customerRepository: ICustomerRepository,
  ) {}

  public async execute({ customer_id, products }: IRequest): Promise<IOrder> {
    const customerExists = await this.customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id!');
    }

    const existsProducts = await this.productRepository.findAllByIds(products);

    if (!existsProducts.length) {
      throw new AppError('Could not find any products with the given ids!');
    }

    const existsProductsIds = existsProducts.map(product => product.id);

    const checkInexistentProducts = products.filter(
      product => !existsProductsIds.includes(product.id),
    );

    if (checkInexistentProducts.length) {
      throw new AppError(`Could not find product ${checkInexistentProducts[0].id}`);
    }

    const quantityAvailable = products.filter(
      product =>
        existsProducts.filter(prod => prod.id === product.id)[0].quantity < product.quantity,
    );

    if (quantityAvailable.length) {
      throw new AppError(
        `The quantity ${quantityAvailable[0].quantity} is not available for ${quantityAvailable[0].id}`,
      );
    }

    const serializedProducts = products.map(product => ({
      product_id: product.id,
      quantity: product.quantity,
      price: existsProducts.filter(p => p.id === product.id)[0].price,
    }));

    const order = await this.orderRepository.createOrder({
      customer: customerExists,
      products: serializedProducts,
    });

    const { ordersProducts } = order;

    const updatedProductQuantity = ordersProducts.map(product => ({
      id: product.product_id,
      quantity:
        existsProducts.filter(p => p.id === product.product_id)[0].quantity - product.quantity,
    }));

    await this.productRepository.updateStock(updatedProductQuantity);

    return order;
  }
}
