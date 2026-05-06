import { Column, Entity } from 'typeorm';
import { Role } from '@/core/enums/role.enum';
import { BaseModel } from '@/core/base-model';
import { LoginType } from '@/core/enums/login-type.enum';

@Entity('users')
export class User extends BaseModel {
  @Column({ type: 'enum', enum: Role, default: Role.User })
  role!: Role;

  @Column({ length: 64 })
  fullName!: string;

  @Column({ length: 128, nullable: true })
  profileImage?: string;

  @Column({ length: 64, unique: true })
  login!: string;

  @Column({ type: 'enum', enum: LoginType })
  loginType!: LoginType;

  @Column({ length: 128, nullable: true })
  password?: string;

  @Column({ type: 'date', nullable: true })
  birthDate?: Date;

  @Column({ type: 'boolean', default: false })
  isVerified!: boolean;

  @Column({ type: 'boolean', default: false })
  isActive!: boolean;

  @Column({ type: 'boolean', default: false })
  isDeleted!: boolean;
}