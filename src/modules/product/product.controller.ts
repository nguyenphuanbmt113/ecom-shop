import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductCreateDto } from './dto/create-product.dto';
import { ProductUpdateDto } from './dto/update-product.dto';
import { ProductService } from './product.service';
import { ParamPro } from './interface/param.interface';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('create')
  createproduct(@Body() data: ProductCreateDto) {
    return this.productService.createProduct(data);
  }

  @Get('/getProducts')
  findProductWithQuery(@Query() query: any) {
    console.log('query:', query);
    return this.productService.getProductQuery(query);
  }

  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.productService.getOneById(id);
  }

  @Get('')
  findAll() {
    return this.productService.findAll();
  }

  @Get('category/:name/:page?')
  findProductWithCategory(@Param('name') name: string) {
    return this.productService.getProductsByCategory(name);
  }

  @Get('brand/:name/:page?')
  findProductWithBrand(@Param() param: ParamPro) {
    return this.productService.getProductsByBand(param);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.productService.deleteProduct(id);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() data: ProductUpdateDto) {
    return this.productService.updateProduct(id, data);
  }
}
