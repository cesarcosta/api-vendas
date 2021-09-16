import { ICreateProduct } from '@modules/products/domain/models/ICreateProduct';
import { IFindProducts } from '@modules/products/domain/models/IFindProducts';
import { IProductPaginate } from '@modules/products/domain/models/IProductPaginate';
import { IProductRepository } from '@modules/products/domain/repositories/IProductRepository';
import { getRepository, In, Repository } from 'typeorm';
import Product from '../entities/Product';

export default class ProductRepository implements IProductRepository {
  private ormRepository: Repository<Product>;

  constructor() {
    this.ormRepository = getRepository(Product);
  }

  public async create({ name, quantity, price }: ICreateProduct): Promise<Product> {
    const product = this.ormRepository.create({ name, quantity, price });

    await this.ormRepository.save(product);

    return product;
  }

  public async save(product: Product): Promise<Product> {
    await this.ormRepository.save(product);

    return product;
  }

  public async findByName(name: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        name,
      },
    });
    return product;
  }

  public async findAllByIds(products: IFindProducts[]): Promise<Product[]> {
    const productsIds = products.map(product => product.id);

    const existsProducts = await this.ormRepository.find({
      where: {
        id: In(productsIds),
      },
    });

    return existsProducts;
  }

  public async findOne(id: string): Promise<Product | undefined> {
    const product = await this.ormRepository.findOne({
      where: {
        id,
      },
    });
    return product;
  }

  public async find(): Promise<Product[]> {
    const products = await this.ormRepository.find();
    return products;
  }

  public async findAllPaginate(): Promise<IProductPaginate> {
    const products = await this.ormRepository.createQueryBuilder().paginate();
    return products as IProductPaginate;
  }

  public async remove(product: Product): Promise<void> {
    await this.ormRepository.remove(product);
  }
}
