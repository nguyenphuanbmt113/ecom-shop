import { IsEmail, IsOptional, IsString } from 'class-validator';

export class UserUpdateDto {
  @IsOptional()
  @IsString()
  name: string;

  @IsOptional()
  @IsEmail()
  email: string;

  @IsOptional()
  @IsString()
  address: string;
}
