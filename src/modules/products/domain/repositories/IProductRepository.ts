import { ICreateProduct } from '../models/ICreateProduct';
import { IFindProducts } from '../models/IFindProducts';
import { IProduct } from '../models/IProduct';
import { IProductPaginate } from '../models/IProductPaginate';
import { IUpdateStockProduct } from '../models/IUpdateStockProduct';

export interface IProductRepository {
  create(data: ICreateProduct): Promise<IProduct>;

  findByName(name: string): Promise<IProduct | undefined>;

  findAllByIds(products: IFindProducts[]): Promise<IProduct[]>;

  findOne(id: string): Promise<IProduct | undefined>;

  find(): Promise<IProduct[]>;

  findAllPaginate(): Promise<IProductPaginate>;

  remove(product: IProduct): Promise<void>;

  save(product: IProduct): Promise<IProduct>;

  updateStock(products: IUpdateStockProduct[]): Promise<void>;
}
