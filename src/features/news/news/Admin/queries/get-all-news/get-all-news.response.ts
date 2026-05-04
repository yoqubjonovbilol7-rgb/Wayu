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

export class GetAllNewsResponse {
  @Expose()
  @ApiProperty({ type: [NewsItemResponse] })
  @Type(() => NewsItemResponse)
  data!: NewsItemResponse[];

  @Expose()
  @ApiProperty()
  total!: number;

  @Expose()
  @ApiProperty()
  page!: number;

  @Expose()
  @ApiProperty()
  limit!: number;

  @Expose()
  @ApiProperty()
  totalPages!: number;
}