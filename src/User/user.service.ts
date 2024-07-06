import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/user.Entity';
import { Repository } from 'typeorm';
import { CreateUserModel } from './Model/create-user.model';
import { UpdateUserModel } from './Model/update-user.model';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private usersRepository: Repository<User>,
  ) { }

  async getAllUser() {
    const users = await this.usersRepository.find()
    return users
  }

  async getUserById(id: number) {
    return await this.usersRepository.find({ where: { id: id } })
  }

  async createUser(model: CreateUserModel) {
    return await this.usersRepository.save(model)
  }

  async updateUser(id: number, model: UpdateUserModel) {

    return await this.usersRepository.update(id, { ...model })
  }
  async deleteUserById(id: number) {
    return await this.usersRepository.delete({ id: id })
  }

  async findUsersByQuery(q: string): Promise<User[]> {
    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.firstname LIKE :query', { query: `%${query}%` })
      .orWhere('user.lastname LIKE :query', { query: `%${query}%` })
      .orWhere('user.email LIKE :query', { query: `%${query}%` })
      .getMany();
  }
}
//CURD
// tìm kiếm theo tên firstname hoặc lastname hoặc email
