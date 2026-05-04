import { ApiProperty } from "@nestjs/swagger";
import { Expose } from "class-transformer";

export class CreateApplicationResponse {

  @Expose()
  @ApiProperty()
  id: number;

  @Expose()
  @ApiProperty()
  fullName: string;

  @Expose()
  @ApiProperty()
  phoneNumber: string;

  @Expose()
  @ApiProperty()
  email: string;

  @Expose()
  @ApiProperty({ example: 1 })
  vacancyId: number;

  @Expose()
  @ApiProperty()
  resume: string;

  @Expose()
  @ApiProperty()
  status: string;
}