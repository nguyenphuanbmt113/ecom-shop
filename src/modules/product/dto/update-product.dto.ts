import { IsOptional } from 'class-validator';

export class ProductUpdateDto {
  @IsOptional()
  title?: string;

  @IsOptional()
  price?: number;

  @IsOptional()
  description?: string;

  @IsOptional()
  brandId?: number;

  @IsOptional()
  categoryId?: number;

  @IsOptional()
  colorId?: number;
}
