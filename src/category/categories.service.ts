import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from '../Entity/category.entity';


@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
  ) { }

  async AdminFindAll(page: number, search: string): Promise<any> {
    const pageSize = 8;
    let listCategory
    let totalItems
    if (page < 1) {
      page = 1
    }
    const offset = (page - 1) * pageSize;
    if (search && search !== undefined) {
      listCategory = await this.categoryRepository.createQueryBuilder('category')
        .where('category.name LIKE :search', { search: `%${search}%` })
        .skip(offset)
        .take(pageSize)
        .getMany();
      totalItems = await this.categoryRepository.createQueryBuilder('category')
        .where('category.name LIKE :search', { search: `%${search}%` })
        .getCount();;

    }
    else {
      totalItems = (await this.categoryRepository.find()).length;

      listCategory = await this.categoryRepository.find({
        skip: offset,
        take: pageSize
      });
    }
    const totalPages = Math.ceil(totalItems / pageSize);
    return {
      listCategory: listCategory,
      pagination: {
        totalItems: totalItems,
        pageLength: totalPages,
        currentPage: page,
        pageSize: pageSize,
      }
    };
  }

  async findAll(items): Promise<Category[]> {
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
    return this.findCategoryById(id);
  }

  async deleteCategory(id: number): Promise<void> {
    await this.categoryRepository.delete(id);
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
}
