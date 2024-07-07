import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Item } from 'src/entity/item.entity';
import { CategoriesService } from '../category/categories.service';

@Injectable()
export class ItemService {
  constructor(
    @InjectRepository(Item)
    private itemRepository: Repository<Item>,
    private readonly categoryService: CategoriesService
  ) { }

  findAll(): Promise<Item[]> {
    return this.itemRepository.find({ relations: ['category'] });
  }

  async findById(id: number): Promise<Item> {
    return await this.itemRepository.findOne({
      where: { id },
      relations: ['category']
    });
  }

  create(item: Item): Promise<Item> {
    return this.itemRepository.save(item);
  }

  async update(id: number, item: Item): Promise<Item> {
    await this.itemRepository.update(id, item);
    return this.findById(id);
  }

  async remove(id: number): Promise<void> {
    await this.itemRepository.delete(id);
  }
}
