import { IsOptional, IsString, MaxLength, IsEnum, IsBoolean } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { VacancyType } from '@/core/enums/paymentProvider.enum';

export class UpdateVacanciesRequest {
  @IsString()
  @IsOptional()
  @MaxLength(256)
  @ApiProperty({ required: false })
  title?: string;

  @IsString()
  @IsOptional()
  @MaxLength(128)
  @ApiProperty({ required: false })
  address?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  description?: string;

  @IsString()
  @IsOptional()
  @MaxLength(16)
  @ApiProperty({ required: false })
  phoneNumber?: string;

  @IsEnum(VacancyType)
  @IsOptional()
  @ApiProperty({ enum: VacancyType, required: false })
  type?: VacancyType;

  @IsString()
  @IsOptional()
  @MaxLength(64)
  @ApiProperty({ required: false })
  salary?: string;

  @IsBoolean()
  @IsOptional()
  @ApiProperty({ required: false })
  isActive?: boolean;
}