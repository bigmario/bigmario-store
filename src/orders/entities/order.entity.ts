import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
import { Customer } from 'src/customers/entities/customer.entity';
import { Product } from 'src/products/entities/product.entity';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: Date;

  @Column({ type: 'character varying', length: 255 })
  customer: Customer;

  @Column({ type: 'character varying', length: 255 })
  products: Product;
}
