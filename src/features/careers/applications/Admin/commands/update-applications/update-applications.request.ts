import {ApiProperty} from "@nestjs/swagger";
import {IsEmail, IsNumber, IsOptional, IsString} from "class-validator";

export class UpdateApplicationsRequest {

  @ApiProperty()
  @IsOptional()
  @IsString()
  fullName?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  phoneNumber?: string;

  @ApiProperty()
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiProperty()
  @IsOptional()
  @IsNumber()
  vacancyId?: number;
}