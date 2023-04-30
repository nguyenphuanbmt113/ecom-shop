import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import User from './user.entity';
import Product from './product.entity';

@Entity()
class Cart extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  userId: number;

  @Column()
  productId: number;

  @Column({ nullable: true })
  count: number;

  @Column({ nullable: true })
  totalAfterDiscount: number;

  @Column({ nullable: true })
  priceProduct: number;

  @ManyToOne(() => User, (user) => user.carts)
  user: User;

  @ManyToOne(() => Product, (product) => product.carts)
  product: Product;
}
export default Cart;
