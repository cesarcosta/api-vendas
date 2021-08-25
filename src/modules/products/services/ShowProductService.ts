import { getCustomRepository } from 'typeorm';
import ProductRepository from '../typeorm/repositories/ProductRepository';
import Product from '../typeorm/entities/Product';
import AppError from '@shared/errors/AppError';

interface IRequest {
  id: string;
}

export default class ShowProductService {
  public async execute({ id }: IRequest): Promise<Product> {
    const productRepository = getCustomRepository(ProductRepository);

    const product = await productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    return product;
  }
}
