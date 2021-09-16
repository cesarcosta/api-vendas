import AppError from '@shared/errors/AppError';
import { inject, injectable } from 'tsyringe';
import { IDeleteProduct } from '../domain/models/IDeleteProduct';
import { IProductRepository } from '../domain/repositories/IProductRepository';

@injectable()
export default class DeleteProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute({ id }: IDeleteProduct): Promise<void> {
    const product = await this.productRepository.findOne(id);

    if (!product) {
      throw new AppError('Product not found!', 404);
    }

    await this.productRepository.remove(product);
  }
}
