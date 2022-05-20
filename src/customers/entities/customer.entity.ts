import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'customers' })
export class Customer {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 255 })
  name: string;

  @Column({ type: 'character varying', length: 255 })
  lastName: string;

  @Column({ type: 'character varying', length: 255 })
  phone: string;
}
