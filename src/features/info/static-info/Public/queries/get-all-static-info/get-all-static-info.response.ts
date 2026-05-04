import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class StaticInfoPublicResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  appStoreLink!: string;

  @Expose()
  @ApiProperty()
  playMarketLink!: string;

  @Expose()
  @ApiProperty()
  aboutUs!: string;

  @Expose()
  @ApiProperty()
  created!: string;
}

export class GetAllStaticInfoPublicResponse {
  @Expose()
  @ApiProperty({ type: [StaticInfoPublicResponse] })
  data!: StaticInfoPublicResponse[];

  @Expose()
  @ApiProperty()
  total!: number;
}