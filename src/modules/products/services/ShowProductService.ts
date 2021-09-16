import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IShowProduct } from '../domain/models/IShowProduct';
import { IProduct } from '../domain/models/IProduct';

@injectable()
export default class ShowProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}
  public async execute({ id }: IShowProduct): Promise<IProduct> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    return product;
  }
}
