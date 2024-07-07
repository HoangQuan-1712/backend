import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/entity/item.entity';
import { ItemService } from 'src/items/item.service';
import { ItemController } from 'src/items/item.controller';
import { ConfigModule } from '@nestjs/config';
import { CategoryModule } from 'src/category/categories.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item]),
        ConfigModule,
        CategoryModule
    ],
    providers: [ItemService],
    controllers: [ItemController],
})
export class ItemModule { }
