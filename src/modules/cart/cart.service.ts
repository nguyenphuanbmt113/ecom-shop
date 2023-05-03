import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import Cart from 'src/entities/cart.entity';
import { Repository } from 'typeorm';
import { UserService } from '../user/user.service';
import { ProductService } from '../product/product.service';

@Injectable()
export class CartService {
  constructor(
    @InjectRepository(Cart)
    private cartsRepo: Repository<Cart>,
    private userService: UserService,
    private productService: ProductService,
  ) {}

  async addtoCart(productId: number, userId: number, quantity: number) {
    const cartItems = await this.cartsRepo.find({
      relations: ['product', 'user'],
    });
    const product = await this.productService.getOneById(productId);
    const authUser = await this.userService.getOneById(userId);
    if (product) {
      const cart = cartItems.filter(
        (item) => item.product.id === productId && item.user.id === userId,
      );
      if (cart.length < 1) {
        const newItem = this.cartsRepo.create({
          total: product.price * quantity,
          quantity,
        });
        newItem.user = authUser;
        newItem.product = product;
        this.cartsRepo.save(newItem);
        return await this.cartsRepo.save(newItem);
      } else {
        //Update the item quantity
        const quantity = (cart[0].quantity += 1);
        const total = cart[0].total * quantity;
        return await this.cartsRepo.update(cart[0].id, {
          quantity,
          total,
        });
      }
    }
  }

  async getItemsInCard(userId: number): Promise<Cart[]> {
    const userCart = await this.cartsRepo.find({
      relations: ['product', 'user'],
    });
    return (await userCart).filter((item) => item.user.id === userId);
  }
}
