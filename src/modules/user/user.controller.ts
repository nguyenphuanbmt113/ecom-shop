import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserService } from './user.service';
import { UserUpdateDto } from './dto/update-user.dto';
import { UserCreateDto } from './dto/create-user.dto';

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

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.usersService.delete(id);
  }

  @Put('update/:id')
  update(@Param('id') id: number, @Body() data: UserUpdateDto) {
    console.log('data:', data);
    console.log('id:', id);
    return this.usersService.update(id, data);
  }

  @Put('update-address/:id')
  updateAddress(@Param('id') id: number, @Body() data: UserUpdateDto) {
    return this.usersService.updateAddress(id, data);
  }

  @Put('block-user/:id')
  blockUser(@Param('id') id: number) {
    return this.usersService.blockUser(id);
  }

  @Put('unblock-user/:id')
  unblockUser(@Param('id') id: number) {
    return this.usersService.unblockUser(id);
  }
}
