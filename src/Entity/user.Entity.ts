import { Entity, Column, PrimaryGeneratedColumn, JoinTable, OneToMany } from 'typeorm';
import { Role } from './role.Entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstname: string;

  @Column()
  lastname: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
    role: number;

  @Column()
    phone: string;
    
  @Column()
    gender: string;

  @Column()
    address: string;

  @Column()
    birthday: Date;

  @OneToMany(() => Role, role => role.users)
  @JoinTable()
  roles: Role[];
}
