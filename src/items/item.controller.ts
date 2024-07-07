import { Controller, Get, Post, Body, Param, Put, Delete } from '@nestjs/common';
import { ItemService } from './item.service';
import { Item } from 'src/items/entity/item.entity';

@Controller('items')
export class ItemController {
  constructor(private readonly itemService: ItemService) { }

  @Get()
  findAll(): Promise<Item[]> {
    return this.itemService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Item> {
    return this.itemService.findOne(id);
  }

  @Post()
  create(@Body() item: Item): Promise<Item> {
    return this.itemService.create(item);
  }

  @Put(':id')
  update(@Param('id') id: number, @Body() item: Item): Promise<Item> {
    return this.itemService.update(id, item);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.itemService.remove(id);
  }
}
