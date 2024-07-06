import { Controller, Get, Post, Body, Param, Delete, Put } from '@nestjs/common';
import { RolesService } from './role.service';
import { Role } from 'src/Entity/role.Entity';

@Controller('roles')
export class RolesController {
  constructor(private readonly rolesService: RolesService) { }

  @Get()
  findAll(): Promise<Role[]> {
    return this.rolesService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: number): Promise<Role> {
    return this.rolesService.findOne(id);
  }

  @Post()
  create(@Body() role: Role): Promise<Role> {
    return this.rolesService.create(role);
  }

  @Put(":id")
  update(@Param() id: number, @Body() updatedRole: Partial<Role>): Promise<Role> {
    return this.rolesService.update(id, updatedRole);
  }

  @Delete(':id')
  remove(@Param('id') id: number): Promise<void> {
    return this.rolesService.remove(id);
  }
}

// @Get()
// getHello(): string {
//   return this.roleService.getHello();
// }

