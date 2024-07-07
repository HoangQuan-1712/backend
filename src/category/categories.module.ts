import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './Entity/Category.entity';
import { CategoriesService } from 'src/category/categories.service';
import { CategoriesController } from 'src/category/categories.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  providers: [CategoriesService],
  controllers: [CategoriesController],
})
export class CategoriesModule { }
