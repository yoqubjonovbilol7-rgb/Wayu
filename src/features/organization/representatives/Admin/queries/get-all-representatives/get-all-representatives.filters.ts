import { ApiPropertyOptional } from '@nestjs/swagger';
import {IsInt, IsOptional,  } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllRepresentativesFilters {
  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page : number;

  @ApiPropertyOptional()
  @Type(() => Number)
  @IsOptional()
  @IsInt()

  size : number;
}
