import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Role } from 'src/Entity/role.Entity';

@Injectable()
export class RolesService {
  constructor(
    @InjectRepository(Role)
    private rolesRepository: Repository<Role>,
  ) { }

  async findAll(): Promise<Role[]> {
    return await this.rolesRepository.find({ relations: ['users'] });
  }

  async findOne(id: number): Promise<Role> {
    return await this.rolesRepository.findOneBy({ id });
  }

  async create(role: Role): Promise<Role> {
    return await this.rolesRepository.save(role);
  }

  async update(id: number, updatedRole: Partial<Role>): Promise<Role> {
    await this.rolesRepository.update(id, updatedRole);
    return this.rolesRepository.findOne({ where: { id } });
  }

  async remove(id: number): Promise<void> {
    await this.rolesRepository.delete(id);
  }
}
