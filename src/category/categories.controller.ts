import { Body, Controller, Delete, Get, Param, Post, Put, Query, Req, UploadedFile, UseInterceptors, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoriesService } from 'src/category/categories.service';
import { Category } from './entity/category.entity';

@Controller('categories')
export class CategoryController {
  constructor(private readonly categoriesService: CategoriesService) { }

  @Get("admin")
  adminFindAll(@Query('page') page: number, @Query('search') search: string): Promise<any> {
    return this.categoriesService.AdminFindAll(page, search);
  }

  @Delete("many")
  @UsePipes(new ValidationPipe({ transform: true }))
  DeleteMany(@Body() deleteManyDto: any): Promise<void> {
    return this.categoriesService.deletemany(deleteManyDto.data.listid);
  }

  @Get()
  findAll(@Query('page') page: number): Promise<Category[]> {
    return this.categoriesService.findAll(page);
  }

  @Get(':id')
  findCategoryById(@Param("id") id: number): Promise<Category> {
    return this.categoriesService.findCategoryById(id);
  }

  @Post()
  @UsePipes(new ValidationPipe({ transform: true }))
  create(@Body() category: Category): Promise<Category> {
    return this.categoriesService.createCategory(category);
  }

  @Put(':id')
  @UsePipes(new ValidationPipe({ transform: true }))
  update(@Param('id') id: number, @Body() category: Category): Promise<Category> {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  Delete(@Param('id') id: number): Promise<void> {
    return this.categoriesService.delete(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findCategoryById(id);
  }
}
