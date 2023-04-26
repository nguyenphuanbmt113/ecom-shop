import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';

@Entity()
class Coupon extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public title: string;

  @Column()
  public expire: Date;

  @Column()
  public discount: number;
}

export default Coupon;
