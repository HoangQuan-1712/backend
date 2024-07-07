import { Module } from '@nestjs/common';
import { RolesController } from './role.controller';
import { RolesService } from './role.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Role } from 'src/Entity/role.Entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([Role]),
  ],
  controllers: [RolesController],
  providers: [RolesService],
})
export class RoleModule { }
