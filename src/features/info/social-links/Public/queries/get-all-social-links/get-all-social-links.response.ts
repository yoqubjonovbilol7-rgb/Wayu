import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class SocialLinkPublicResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title!: string;

  @Expose()
  @ApiProperty()
  icon!: string;

  @Expose()
  @ApiProperty()
  link!: string;

  @Expose()
  @ApiProperty()
  created!: string;
}

export class GetAllSocialLinksPublicResponse {
  @Expose()
  @ApiProperty({ type: [SocialLinkPublicResponse] })
  data!: SocialLinkPublicResponse[];

  @Expose()
  @ApiProperty()
  total!: number;
}