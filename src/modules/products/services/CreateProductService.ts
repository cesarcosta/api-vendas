import { getCustomRepository } from 'typeorm';
import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

interface IRequest {
  name: string;
  price: number;
  quantity: number;
}

export default class CreateProductService {
  public async execute({ name, price, quantity }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const productExists = await productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name!');
    }

    const product = productRepository.create({ name, price, quantity });

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await productRepository.save(product);

    return product;
  }
}
