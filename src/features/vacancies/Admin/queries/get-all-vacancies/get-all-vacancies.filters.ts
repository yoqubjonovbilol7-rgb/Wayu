import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsEnum } from 'class-validator';
import { Type } from 'class-transformer';
import { VacancyType } from '@/core/enums/paymentProvider.enum';

export class GetAllVacanciesFilters {
  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  page?: number;

  @IsInt()
  @Type(() => Number)
  @IsOptional()
  @ApiProperty({ required: false })
  size?: number;

  @IsEnum(VacancyType)
  @IsOptional()
  @ApiProperty({ enum: VacancyType, required: false })
  type?: VacancyType;

  @IsOptional()
  @ApiProperty({ required: false })
  isActive?: boolean;
}
