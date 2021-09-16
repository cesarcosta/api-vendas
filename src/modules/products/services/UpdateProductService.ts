import redisCache from '@shared/cache/RedisCache';
import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';

interface IRequest {
  id: string;
  name: string;
  price: number;
  quantity: number;
}

@injectable()
export default class UpdateProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({ id, name, price, quantity }: IRequest): Promise<void> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    const productExists = await this.productRepository.findByName(name);

    if (productExists) {
      throw new AppError('There is already one product with this name!');
    }

    product.name = name;
    product.price = price;
    product.quantity = quantity;

    await redisCache.invalidate('api-vendas-PRODUCT_LIST');

    await this.productRepository.save(product);
  }
}
