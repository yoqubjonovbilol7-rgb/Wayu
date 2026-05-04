import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { ApplicationStatus } from '@/core/enums/paymentProvider.enum';

export class ApplicationPublicResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  fullName!: string;

  @Expose()
  @ApiProperty()
  phoneNumber!: string;

  @Expose()
  @ApiProperty()
  email!: string;

  @Expose()
  @ApiProperty()
  vacancyId!: number;

  @Expose()
  @ApiProperty({ enum: ApplicationStatus })
  status!: ApplicationStatus;

  @Expose()
  @ApiProperty()
  resume!: string;

  @Expose()
  @ApiProperty()
  created!: string;
}

export class GetAllApplicationsPublicResponse {
  @Expose()
  @ApiProperty({ type: [ApplicationPublicResponse] })
  data!: ApplicationPublicResponse[];

  @Expose()
  @ApiProperty()
  total!: number;
}