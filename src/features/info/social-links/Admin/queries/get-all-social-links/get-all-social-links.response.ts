import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class GetAllSocialLinksResponse {
  @ApiProperty()
  @Expose()
  id: number;

  @ApiProperty()
  @Expose()
  title: string;

  @ApiProperty()
  @Expose()
  icon: string;

  @ApiProperty()
  @Expose()
  link: string;
}