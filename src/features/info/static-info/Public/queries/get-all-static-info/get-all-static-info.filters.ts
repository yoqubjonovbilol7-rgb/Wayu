import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllStaticInfoPublicFilters {
  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page;

  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  size;
}