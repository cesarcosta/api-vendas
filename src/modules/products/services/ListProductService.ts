import { getCustomRepository } from 'typeorm';
import redisCache from '@shared/cache/RedisCache';
import Product from '../infra/typeorm/entities/Product';
import ProductRepository from '../infra/typeorm/repositories/ProductRepository';

export default class ListProductService {
  public async execute(): Promise<Product[]> {
    const productRepository = getCustomRepository(ProductRepository);

    let products = await redisCache.recover<Product[]>('api-vendas-PRODUCT_LIST');

    if (!products) {
      products = await productRepository.find();
      await redisCache.save('api-vendas-PRODUCT_LIST', products);
    }

    return products;
  }
}
