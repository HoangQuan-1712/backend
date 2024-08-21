import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/Entity/user.Entity';
import { Repository } from 'typeorm';
import { CreateUserModel } from './Model/create-user.model';
import { UpdateUserModel } from './Model/update-user.model';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { LoginUserDto } from 'src/user/dto/login-user.dto';


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

  async createUser(model: CreateUserModel): Promise<User> {
    const newUser = this.usersRepository.create(model);
    return await this.usersRepository.save(newUser)
  }

  async updateUser(id: number, model: UpdateUserModel) {

    return await this.usersRepository.update(id, { ...model })
  }
  async deleteUserById(id: number) {
    return await this.usersRepository.delete({ id: id })
  }


  async findUsersByQuery(q: string, page: number): Promise<User[]> {
    //lấy bao nhiêu cái
    if (page <= 0) {

      return await this.usersRepository
        .createQueryBuilder('user')
        .where('user.firstname LIKE :query', { query: `%${q}%` })
        .orWhere('user.lastname LIKE :query', { query: `%${q}%` })
        .orWhere('user.email LIKE :query', { query: `%${q}%` })
        .getMany()
    }
    const total = 2
    const skip = (page - 1) * total

    return await this.usersRepository
      .createQueryBuilder('user')
      .where('user.firstname LIKE :query', { query: `%${q}%` })
      .orWhere('user.lastname LIKE :query', { query: `%${q}%` })
      .orWhere('user.email LIKE :query', { query: `%${q}%` })
      .skip(skip)
      .take(total)
      .getMany()
  }

  async findByEmail(email: string): Promise<User> {
    return this.usersRepository.findOne({ where: { email } });
}

async register(user: User): Promise<any> {
  if (user?.password?.length < 6) {
      const errorMessage = 'Password must be at least 6 characters long.';
      throw new HttpException({ message: errorMessage }, HttpStatus.BAD_REQUEST);
  }

  const checkUser = await this.findByEmail(user.email);
  if (checkUser) {
      throw new HttpException({ message: "Email or password already exists!" }, HttpStatus.BAD_REQUEST);
  }
  try {
      const hashedPassword = await this.hashPassword(user.password);
      const newUser = { ...user, password: hashedPassword };
      await this.createUser(newUser);
      return { message: "Register successfully" };
  } catch (error) {
      throw new HttpException('Failed to register user.', HttpStatus.INTERNAL_SERVER_ERROR);
  }
}

  async hashPassword(password: string): Promise<string> {
    const saltRound = process.env.BCRYPT_SALT_ROUNDS;
    const salt = await bcrypt.genSalt(+saltRound);
    const hash = await bcrypt.hash(password, salt);

    return hash;
}

// async signIn(loginUserDto: LoginUserDto): Promise<any> {
//   const user = await this.usersRepository.findOne({ where: { email: loginUserDto.email } });
//   if (!user) {
//       throw new HttpException({ message: "Email or password is incorrect!" }, HttpStatus.BAD_REQUEST);
//   }
//   const checkPass = await bcrypt.compare(loginUserDto.password, user.password);
//   if (!user.password || !checkPass) {
//       throw new HttpException({ message: "Email or password is incorrect!" }, HttpStatus.BAD_REQUEST);
//   }

//   const { password, accesstoken, refreshtoken, ...userrest } = user;
//   return this.generateToken(userrest);
// }

// private async generateToken(payload: any) {
//   const accesstoken = await this.jwtService.signAsync(payload, {
//       expiresIn: process.env.EXP_IN_ACCESS_TOKEN
//   });
//   const refreshtoken = await this.jwtService.signAsync(payload, {
//       expiresIn: process.env.EXP_IN_REFRESH_TOKEN
//   });
//   await this.usersRepository.update({ email: payload.email }, { refreshtoken: refreshtoken });

//   return { accesstoken };
// }

// async refreshToken(id: number): Promise<any> {
//   try {
//       const user = await this.findOne(id);
//       const checkExistToken = await this.jwtService.verifyAsync(user.refreshtoken);
//       if (!checkExistToken) {
//           throw new HttpException({ message: 'Your session has expired, please log in again' }, HttpStatus.BAD_REQUEST);
//       }
//       const { password, refreshtoken, accesstoken, ...rest } = user;
//       const newtoken = await this.jwtService.signAsync(rest, {
//           expiresIn: process.env.EXP_IN_ACCESS_TOKEN
//       });
//       return { token: newtoken };
//   } catch (error) {
//       throw new HttpException({ message: 'Your session has expired, please log in again' }, HttpStatus.BAD_REQUEST);
//   }
// }
}
//bycrypt
