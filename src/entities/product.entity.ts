import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import Brand from './brand.entity';
import Category from './category.entity';
import Color from './color.entity';
import slugify from 'slugify';
@Entity()
class Product extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public title: string;

  @Column({ nullable: true })
  public slug: string;

  @Column()
  public price: number;

  @Column({ default: '' })
  public description: string;

  @Column({ default: 10 })
  public quantity: number;

  @Column({ default: 0 })
  public sold: number;

  @Column()
  public thumb: string;

  @Column()
  public image: string;

  @Column()
  public brandId: number;

  @Column()
  public categoryId: number;

  @Column()
  public colorId: number;

  @BeforeInsert()
  @BeforeUpdate()
  generateSlug() {
    this.slug = slugify(this.title, { lower: true });
  }

  //relational
  @ManyToOne(() => Color, (color) => color.products, { onDelete: 'SET NULL' })
  @JoinColumn()
  color: Color;

  @ManyToOne(() => Brand, (brand) => brand.products, { onDelete: 'SET NULL' })
  @JoinColumn()
  brand: Brand;

  @ManyToOne(() => Category, (category) => category.products, {
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  category: Category;
}

export default Product;
