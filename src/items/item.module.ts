import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from 'src/items/entity/item.entity';
import { ItemService } from 'src/items/item.service';
import { ItemController } from 'src/items/item.controller';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from 'src/category/categories.module';

@Module({
    imports: [
        TypeOrmModule.forFeature([Item])
        ConfigModule,
        CategoriesModule
    ],
    providers: [ItemService],
    controllers: [ItemController],
})
export class ItemModule { }
