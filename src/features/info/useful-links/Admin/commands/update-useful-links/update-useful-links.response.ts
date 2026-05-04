import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateUsefulLinksResponse {
  @Expose()
  @ApiProperty({ example: 1 })
  id: number;

  @Expose()
  @ApiProperty()
  title: string;

  @Expose()
  @ApiProperty()
  icon: string;

  @Expose()
  @ApiProperty()
  link: string;
}