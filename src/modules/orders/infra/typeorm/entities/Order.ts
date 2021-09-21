import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

import Customer from '@modules/customers/infra/typeorm/entities/Customer';
import OrderProduct from './OrderProduct';
import { IOrder } from '@modules/orders/domain/models/IOrder';

@Entity('orders')
export default class Order implements IOrder {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('int')
  order: number;

  @ManyToOne(() => Customer)
  @JoinColumn({ name: 'customer_id' })
  customer: Customer;

  @OneToMany(() => OrderProduct, order_products => order_products.order, {
    cascade: true,
  })
  ordersProducts: OrderProduct[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
