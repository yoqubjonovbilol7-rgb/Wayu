import {ApiProperty} from "@nestjs/swagger";
import {IsString, IsUrl} from "class-validator";

export class CreateUsefulLinksRequest {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  icon: string;

  @ApiProperty()
  @IsUrl()
  link: string;
}