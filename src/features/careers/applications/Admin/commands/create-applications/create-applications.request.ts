import {IsEmail, IsNotEmpty, IsNumber, IsString, MaxLength} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateApplicationsRequest {

  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  fullName: string;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  @IsNotEmpty()
  phoneNumber: string;

  @ApiProperty()
  @IsEmail()
  @IsNotEmpty()
  email: string;

  @ApiProperty()
  @IsNumber()
  vacancyId: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  resume: Express.Multer.File;
}