import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 255, unique: true })
  name: string;
}
