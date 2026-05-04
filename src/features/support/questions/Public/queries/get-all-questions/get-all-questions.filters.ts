import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllQuestionsPublicFilters {
  @ApiProperty({required: false})
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  page?: number;

  @ApiProperty({required: false})
  @IsOptional()
  @IsInt()
  @Type(() => Number)
  size?: number;
}

