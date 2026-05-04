import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, IsUrl} from "class-validator";

export class UpdateUsefulLinksRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  icon?: string;

  @ApiProperty()
  @IsOptional()
  @IsUrl()
  link?: string;
}