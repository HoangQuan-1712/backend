import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entity/category.entity';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async findAll(): Promise<Category[]> {
    return this.categoryRepository.find({ relations: ['items'] });
  }

  async findCategoryById(id: number): Promise<Category> {
    return this.categoryRepository.findOneBy({ id });

  }

  async createCategory(category: Category): Promise<any> {

    try {
      await this.categoryRepository.save(category);
      return {
        message: `Created ${category.name} item success!`
      }

    } catch (error) {
      throw new HttpException({ messages: 'Create category error!' }, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: number, category: Category): Promise<Category> {
    await this.categoryRepository.update(id, category);
    return this.findOne(id);
  }
  async deletemany(ids: number[]): Promise<any> {
    if (ids.length <= 0) {
      throw new HttpException({ messages: 'Delete items error!' }, HttpStatus.BAD_REQUEST);
    }
    const itemsToDelete = await this.categoryRepository.findByIds(ids);
    itemsToDelete.forEach(item => {
      deleteFile(item.thumbnail);
    });
    await this.categoryRepository.delete(ids);

    return {
      message: "Delete succesfully"
    }
  }

  async remove(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
  }

}
