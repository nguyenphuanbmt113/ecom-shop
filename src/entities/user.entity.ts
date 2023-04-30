import * as crypto from 'crypto';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import Cart from './cart.entity';
import Comment from './comment.entity';
@Entity()
class User extends BaseClassEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  public name: string;

  @Column()
  public address: string;

  @Column()
  public email: string;

  @Column()
  public password: string;

  @Column()
  public mobile: number;

  @Column({ default: '' })
  public image: string;

  @Column({ default: 'user' })
  public role: string;

  @Column({ default: false })
  public isBlocked: boolean;

  @Column({ nullable: true })
  public refreshToken: string;

  @Column({ nullable: true })
  public passwordchangedAt: number;

  @Column({ nullable: true })
  public passwordResetToken: string;

  @Column({ nullable: true })
  public passwordResetExpire: Date;

  @Column({ default: false })
  public isEmailConfirmed: boolean;

  public createPasswordToken() {
    const resetToken = crypto.randomBytes(32).toString('hex');
    console.log('resetToken:', resetToken);
    this.passwordResetToken = crypto
      .createHash('sha256')
      .update(resetToken)
      .digest('hex');
    this.passwordResetExpire = new Date(Date.now() + 15 * 60 * 1000);
    console.log('this.passwordResetExpire :', this.passwordResetExpire);
    return resetToken;
  }

  @OneToMany(() => Cart, (cart) => cart.user)
  carts: Cart[];

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];
}

export default User;
