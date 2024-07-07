import { Body, Controller, Delete, Get, Param, Post, Put, Query, UsePipes, ValidationPipe } from '@nestjs/common';
import { CategoryService } from 'src/category/categories.service';
import { Category } from '../Entity/category.entity';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("ms-category")
@Controller('category')
export class CategoryController {
  constructor(private readonly categoriesService: CategoryService) { }

  @Get("all")
  getAllCategory(): Promise<Category[]> {
    return this.categoriesService.getAllCategory();
  }

  @Get("admin")
  adminFindAll(@Query('page') page: number, @Query('search') search: string): Promise<any> {
    return this.categoriesService.AdminFindAll(page, search);
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
  create(@Body() category: Category): Promise<Category> {
    return this.categoriesService.createCategory(category);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() category: Category): Promise<Category> {
    return this.categoriesService.update(id, category);
  }

  @Delete(':id')
  Delete(@Param('id') id: number): Promise<void> {
    return this.categoriesService.deleteCategory(id);
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Category> {
    return this.categoriesService.findCategoryById(id);
  }

}
