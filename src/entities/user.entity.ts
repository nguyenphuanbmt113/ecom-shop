import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import BaseClassEntity from './base-entity.entity';
import * as crypto from 'crypto';
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
}

export default User;
