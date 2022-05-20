import { PrimaryGeneratedColumn, Column, Entity } from 'typeorm';
@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'character varying', length: 255 })
  email: string;

  @Column({ type: 'character varying', length: 255 })
  password: string;

  @Column({ type: 'character varying', length: 255 })
  role: string;
}
