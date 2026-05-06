import {ApiProperty} from '@nestjs/swagger';
import {IsEmail, IsString, MaxLength} from "class-validator";

export class UpdateRepresentativeRequest {


  @IsString()
  @ApiProperty()
  fullName?: string;

  @IsEmail()
  @ApiProperty()
  email?: string;

  @MaxLength(16)
  @ApiProperty()
  phoneNumber?: string;

  @ApiProperty()
  resume?: string;

  @ApiProperty({ type: 'string', format: 'binary'})
  image?: Express.Multer.File;
}