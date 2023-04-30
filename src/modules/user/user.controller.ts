import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { UserDtoExport } from '../auth/dto/user.dto';
import { RoleGuardAdmin } from '../auth/guard/checkrole.guard';
import { JWTAuthGuard } from '../auth/guard/jwt.guard';
import { PlainToClass } from '../auth/interceptor/user.interceptor';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserService } from './user.service';

@UseInterceptors(new PlainToClass(UserDtoExport))
@Controller('user')
export class UserController {
  constructor(private usersService: UserService) {}

  @Post('create')
  createUser(@Body() data: UserCreateDto) {
    return this.usersService.create(data);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.usersService.getOneById(id);
  }

  @Get(':email')
  findOneByEmail(@Param('email') email: string) {
    return this.usersService.findByEmail(email);
  }

  @Get('')
  findAll() {
    return this.usersService.findAll();
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Put('update/:id')
  update(@Param('id') id: number, @Body() data: UserUpdateDto) {
    console.log('data:', data);
    console.log('id:', id);
    return this.usersService.update(id, data);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Put('update-address/:id')
  updateAddress(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return this.usersService.updateAddress(id, data);
  }

  @UseGuards(JWTAuthGuard, RoleGuardAdmin)
  @Put('block-user/:id')
  blockUser(@Param('id') id: number) {
    return this.usersService.blockUser(id);
  }

  @Put('unblock-user/:id')
  unblockUser(@Param('id') id: number) {
    return this.usersService.unblockUser(id);
  }
}
