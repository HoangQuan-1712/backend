import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { User } from './user.Entity';

@Entity()
export class Role {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => User, user => user.role)
  users: User[];
}


//1user có 1 role
//admin - custermer

//1role có nhiều user
//quyền admin cấp cho tài khoản admin@gmail.com, hoang@gmail.com