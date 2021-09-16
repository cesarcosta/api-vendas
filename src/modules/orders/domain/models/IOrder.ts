import { ICustomer } from '@modules/customers/domain/models/ICustomer';
import { ICreateOrderProduct } from './ICreateOrderProduct';

export interface IOrder {
  id: string;
  customer: ICustomer;
  ordersProducts: ICreateOrderProduct;
  created_at: Date;
  updated_at: Date;
}
