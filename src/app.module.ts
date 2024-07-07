import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { dataSourceOptions } from 'db/data-source';
import { UserModule } from './User/user.module';
import { RoleModule } from './Role/role.module';
import { Role } from './Entity/role.Entity';
import { User } from './Entity/user.Entity';
import { Module } from '@nestjs/common';
import { CategoryModule } from './category/categories.module';
import { ItemModule } from './items/item.module';
import { Item } from './entity/item.entity';
import { Category } from './Entity/category.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ConfigModule.forRoot(),
    RoleModule,
    CategoryModule,
    ItemModule,
    TypeOrmModule.forFeature([Role, User, Category, Item]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
