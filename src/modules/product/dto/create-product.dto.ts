import { IsNotEmpty, IsOptional } from 'class-validator';

export class ProductCreateDto {
  @IsNotEmpty()
  title: string;

  @IsNotEmpty()
  price: number;

  @IsNotEmpty()
  description: string;

  @IsNotEmpty()
  quantity: number;

  @IsOptional()
  sold: number;

  @IsNotEmpty()
  thumb: string;

  @IsNotEmpty()
  image: string;

  @IsNotEmpty()
  brandId: number;

  @IsNotEmpty()
  categoryId: number;

  @IsNotEmpty()
  colorId: number;
}
