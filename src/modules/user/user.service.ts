import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import User from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserCreateDto } from './dto/create-user.dto';
import { UserUpdateDto } from './dto/update-user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepo: Repository<User>,
  ) {}

  async getOneById(id: number) {
    const user = await this.usersRepo.findOne({
      where: { id },
    });
    if (!user) {
      throw new NotFoundException();
    }
    return user;
  }
  async getOneByIdAndRefreshToken(id: number, refreshToken: string) {
    const user = await this.usersRepo.findOne({
      where: { id, refreshToken },
    });
    return user;
  }

  async getOneByPasswordToken(password_token: string) {
    const user = await this.usersRepo.findOne({
      where: { passwordResetToken: password_token },
    });
    return user;
  }

  async findByEmail(email: string) {
    const user = await this.usersRepo.findOne({
      where: { email: email },
    });
    return user;
  }

  async findAll() {
    const users = await this.usersRepo.find();
    return users;
  }

  async delete(id: number) {
    const user = await this.getOneById(id);
    await this.usersRepo.remove(user);
    return user;
  }

  async update(id: number, data: UserUpdateDto) {
    const user = await this.getOneById(id);
    Object.assign(user, data);
    return this.usersRepo.save(user);
  }

  async updateAddress(id: number, data: UserUpdateDto) {
    const user = await this.getOneById(id);
    Object.assign(user, data);
    return this.usersRepo.save(user);
  }

  async create(data: UserCreateDto) {
    const user = await this.usersRepo.create({ ...data });
    await this.usersRepo.save(user);
    return user;
  }

  async blockUser(id: number) {
    const user = await this.getOneById(id);
    user.isBlocked = true;
    await this.usersRepo.save(user);
  }

  async unblockUser(id: number) {
    const user = await this.getOneById(id);
    user.isBlocked = false;
    await this.usersRepo.save(user);
  }
}
