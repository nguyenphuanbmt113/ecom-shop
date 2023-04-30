import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { CartService } from './cart.service';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { RoleGuardAdmin } from '../auth/guard/checkrole.guard';
import { User } from '../auth/decorator/user.decorator';

@Controller('cart')
export class CartController {
  constructor(private cartService: CartService) {}

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Post('create')
  createUser(@Body() body: any, @User() user: any) {
    const userId = user.userId;
    const { count, productId } = body;
    return this.cartService.addtoCart(productId, userId, count);
  }

  @Get(':id')
  findAllById(@Param('id') id: number) {
    return this.cartService.getCartByUser(id);
  }
}
