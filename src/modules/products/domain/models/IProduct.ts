import { IOrder } from '@modules/orders/domain/models/IOrder';
import { IOrderProduct } from '@modules/orders/domain/models/IOrderProduct';

export interface IProduct {
  id: string;
  name: string;
  price: number;
  quantity: number;
  orders_products?: IOrderProduct[];
  created_at: Date;
  updated_at: Date;
}
