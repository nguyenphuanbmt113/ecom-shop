import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Cart from 'src/entities/cart.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepo: Repository<Cart>,
  ) {}
  async addtoCart(userId: number, productId: number, count: number) {
    try {
      const cart = this.cartsRepo.create({
        userId: userId,
        productId: productId,
        count: count,
      });
      await this.cartsRepo.save(cart);
      return cart;
    } catch (error) {}
  }
  async getCartByUser(userId: number) {
    const allCart = await this.cartsRepo.find({
      where: {
        userId: userId,
      },
    });
    return allCart;
  }
}
