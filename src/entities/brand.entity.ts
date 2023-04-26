import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import Product from './product.entity';

@Entity()
class Brand extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public title: string;

  @OneToMany(() => Product, (product) => product.brand)
  products: Product[];
}

export default Brand;
