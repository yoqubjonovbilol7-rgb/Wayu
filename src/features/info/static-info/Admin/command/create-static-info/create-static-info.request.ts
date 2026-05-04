import {IsOptional, IsString, IsUrl} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateStaticInfoRequest {
  @IsOptional()
  @IsUrl()
  @ApiProperty()
  appStoreLink?: string;

  @IsOptional()
  @IsUrl()
  @ApiProperty()
  playMarketLink?: string;

  @IsString()
  @ApiProperty()
  aboutUs: string;
}