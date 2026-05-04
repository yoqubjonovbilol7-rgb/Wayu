import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsString, IsUrl} from "class-validator";

export class UpdateStaticInfoRequest {
  @IsOptional()
  @IsUrl()
  @ApiProperty()
  appStoreLink?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  playMarketLink?: string;

  @IsOptional()
  @IsString()
  @ApiProperty()
  aboutUs?: string;
}