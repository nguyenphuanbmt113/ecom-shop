import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import Product from './product.entity';

@Entity()
class Category extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public title: string;

  @OneToMany(() => Product, (product) => product.category)
  products: Product[];
}

export default Category;
