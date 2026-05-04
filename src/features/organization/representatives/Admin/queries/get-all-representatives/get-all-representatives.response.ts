import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetAllRepresentativesItemResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  email!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  image!: string;
}

export class GetAllRepresentativesResponse {
  @Expose()
  @ApiProperty({ type: [GetAllRepresentativesItemResponse] })
  data!: GetAllRepresentativesItemResponse[];

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
