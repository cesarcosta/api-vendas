import CustomerRepository from '@modules/customers/typeorm/repositories/CustomerRepository';
import Product from '@modules/products/typeorm/entities/Product';
import ProductRepository from '@modules/products/typeorm/repositories/ProductRepository';
import AppError from '@shared/errors/AppError';
import { getCustomRepository } from 'typeorm';
import Order from './typeorm/entitites/Order';
import OrderRepository from './typeorm/repositories/OrderRepository';

interface IProduct {
  id: string;
  quantity: number;
}

interface IRequest {
  customer_id: string;
  products: IProduct[];
}

export default class CreateOrderService {
  public async execute({ customer_id, products }: IRequest): Promise<Order> {
    const orderRepository = getCustomRepository(OrderRepository);
    const customerRepository = getCustomRepository(CustomerRepository);
    const productRepository = getCustomRepository(ProductRepository);

    const customerExists = await customerRepository.findById(customer_id);

    if (!customerExists) {
      throw new AppError('Could not find any customer with the given id!');
    }

    const existsProducts = await productRepository.findAllByIds(products);

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

    const order = orderRepository.create({
      customer: customerExists,
      ordersProducts: serializedProducts,
    });

    const { ordersProducts } = order;

    await orderRepository.save(order);

    const updatedProductQuantity = ordersProducts.map(product => ({
      id: product.id,
      quantity: existsProducts.filter(p => p.id === product.id)[0].quantity - product.quantity,
    }));

    await productRepository.save(updatedProductQuantity);

    return order;
  }
}
