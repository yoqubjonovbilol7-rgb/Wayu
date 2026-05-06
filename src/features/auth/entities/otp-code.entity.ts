
import { Column, Entity, ManyToOne, Relation } from 'typeorm';
import { User } from '@/core/guards/authentication.guard';
import { BaseModel } from '@/core/base-model';
import { OtpType } from '@/core/enums/otp-type.enum';

@Entity('otpCodes')
export class OtpCode extends BaseModel {
  @Column()
  userId!: number;

  @ManyToOne(() => User, (user) => user, {onDelete: 'CASCADE'})
  user?: Relation<User>;

  @Column({length: 6})
  code!: string;

  @Column({type: 'enum', enum: OtpType})
  type!: OtpType;
}