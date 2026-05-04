import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class UpdateStaticInfoResponse{
  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty({ required: false })
  appStoreLink?: string;

  @Expose()
  @ApiProperty({ required: false })
  playMarketLink?: string;

  @Expose()
  @ApiProperty()
  aboutUs: string;
}