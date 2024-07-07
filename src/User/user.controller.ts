import { Body, Controller, Delete, Get, Param, Post, Put, Query } from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserModel } from './Model/create-user.model';
import { UpdateUserModel } from './Model/update-user.model';
import { ApiBody, ApiTags } from '@nestjs/swagger';
import { User } from 'src/Entity/user.Entity';

@Controller("user")
@ApiTags("ms-user")
export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get("/search")
  SearchUser(@Query("q") q: string, @Query("page") page: number): any {
    //Phân trang
    return this.userService.findUsersByQuery(q, page);
  }
  @Get()
  getAllUser(): any {
    return this.userService.getAllUser()
  }
  @Post()
  createUser(@Body() model: CreateUserModel): any {
    return this.userService.createUser(model)
  }
  @Get(":id")
  getUserById(@Param("id") id: number): any {
    return this.userService.getUserById(id)
  }
  @Put(":id")
  updateUser(@Body() model: UpdateUserModel, @Param("id") id: number): any {
    return this.userService.updateUser(id, model)
  }
  @Delete(":id")
  deleteUserById(@Param("id") id: number): any {
    return this.userService.deleteUserById(id)
  }
}
