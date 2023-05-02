import { Module } from '@nestjs/common';
import { CartController } from './cart.controller';
import { CartService } from './cart.service';
import Cart from 'src/entities/cart.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from '../user/user.module';

@Module({
  imports: [TypeOrmModule.forFeature([Cart]), UserModule],
  controllers: [CartController],
  providers: [CartService],
})
export class CartModule {}
