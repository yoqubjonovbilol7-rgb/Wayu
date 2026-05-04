import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class RepresentativePublicResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  image!: string;

  @Expose()
  @ApiProperty()
  email!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  created!: string;
}

export class GetAllRepresentativesPublicResponse {
  @Expose()
  @ApiProperty({ type: [RepresentativePublicResponse] })
  data!: RepresentativePublicResponse[];

  @Expose()
  @ApiProperty()
  total!: number;
}