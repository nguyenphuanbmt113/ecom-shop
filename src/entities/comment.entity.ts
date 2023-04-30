import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import User from './user.entity';
import Product from './product.entity';

@Entity()
class Comment extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column()
  content: number;

  @Column()
  start1: number;

  @Column()
  start2: number;

  @Column()
  start3: number;

  @Column()
  start4: number;

  @Column()
  start5: number;

  @ManyToOne(() => User, (user) => user.comments)
  user: User;

  @ManyToOne(() => Product, (user) => user.comments)
  product: Product;
}
export default Comment;
