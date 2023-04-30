import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import TagProduct from './tagProduct.entity';

@Entity()
class Tag extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public tag_name: string;

  @OneToMany(() => TagProduct, (tagproduct) => tagproduct.tag)
  tagProducts: TagProduct[];
}

export default Tag;
