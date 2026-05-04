import { Expose } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';
import { VacancyType } from '@/core/enums/paymentProvider.enum';

export class UpdateVacanciesResponse {
  @Expose()
  @ApiProperty()
  id!: number;

  @Expose()
  @ApiProperty()
  title?: string;

  @Expose()
  @ApiProperty()
  address?: string;

  @Expose()
  @ApiProperty()
  description?: string;

  @Expose()
  @ApiProperty()
  phoneNumber?: string;

  @Expose()
  @ApiProperty({ enum: VacancyType })
  type?: VacancyType;

  @Expose()
  @ApiProperty()
  salary?: string;

  @Expose()
  @ApiProperty()
  isActive?: boolean;
}