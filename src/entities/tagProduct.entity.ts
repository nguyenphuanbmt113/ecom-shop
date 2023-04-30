import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import Product from './product.entity';
import Tag from './tab.entity';

@Entity()
class TagProduct extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public tagId: string;

  @Column()
  public productId: string;

  @ManyToOne(() => Product, (product) => product.tagProducts)
  product: Product;

  @ManyToOne(() => Tag, (tag) => tag.tagProducts)
  tag: Tag;
}

export default TagProduct;
