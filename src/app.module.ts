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

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    UserModule,
    ConfigModule.forRoot(),
    RoleModule,
    CategoryModule,
    ItemModule,
    RoleModule,
    TypeOrmModule.forFeature([Role, User]),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
