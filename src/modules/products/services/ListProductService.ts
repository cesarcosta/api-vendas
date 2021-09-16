import { inject, injectable } from 'tsyringe';
import { IProductRepository } from '../domain/repositories/IProductRepository';
import { IProductPaginate } from '../domain/models/IProductPaginate';

@injectable()
export default class ListProductService {
  constructor(
    @inject('ProductRepository')
    private productRepository: IProductRepository,
  ) {}

  public async execute(): Promise<IProductPaginate> {
    const products = await this.productRepository.findAllPaginate();

    return products as IProductPaginate;
  }
}
