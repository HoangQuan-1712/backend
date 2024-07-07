import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RoleService } from './role.service'
import { Role } from 'src/Entity/role.Entity';
import { ApiTags } from '@nestjs/swagger';

@Controller('role')
@ApiTags("ms-role")
export class RoleController {
  constructor(private readonly roleService: RoleService) { }

  @Get()
  findAll(): Promise<Role[]> {
    return this.roleService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.roleService.findOne(id);
  }

  @Post()
  create(@Body() role: Role): Promise<Role> {
    return this.roleService.create(role);
  }

  @Put(":id")
  update(@Param() id: number, @Body() updatedRole: Partial<Role>): Promise<Role> {
    return this.roleService.update(id, updatedRole);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.roleService.remove(id);
  }
}

// @Get()
// getHello(): string {
//   return this.roleService.getHello();
// }

