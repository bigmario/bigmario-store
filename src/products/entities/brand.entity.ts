import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'brands' })
export class Brand {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', unique: true })
  name: string;

  @Column({ type: 'character varying' })
  image: string;
}
