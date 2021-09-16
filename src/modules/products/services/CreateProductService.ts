import AppError from '@shared/errors/AppError';
import redisCache from '@shared/cache/RedisCache';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProduct } from '../domain/models/IProduct';
import { ICreateProduct } from '../domain/models/ICreateProduct';

@injectable()
export default class CreateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ name, price, quantity }: ICreateProduct): Promise<IProduct> {
    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name!');
    }

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    const product = await this.productRepository.create({ name, price, quantity });

    return product;
  }
}
