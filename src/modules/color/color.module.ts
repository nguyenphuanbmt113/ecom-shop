import { Module } from '@nestjs/common';
import { ColorController } from './color.controller';
import { ColorService } from './color.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import Color from 'src/entities/color.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Color])],
  controllers: [ColorController],
  providers: [ColorService],
  exports: [ColorService],
})
export class ColorModule {}
