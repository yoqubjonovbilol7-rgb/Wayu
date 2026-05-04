import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class GetOneStaticInfoPublicResponse {
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