import { Expose, Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class NewsItemResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  content!: string;

  @Expose()
  @ApiProperty()
  date!: string;

  @Expose()
  @ApiProperty()
  categoryId!: number;

  @Expose()
  @ApiProperty()
  countryId?: number;
}

