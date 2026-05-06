import { ApiProperty } from '@nestjs/swagger';
import {IsInt, IsOptional, } from 'class-validator';
import { Type } from 'class-transformer';

export class GetAllNewsFilters {
  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  page = 1;

  @ApiProperty()
  @Type(() => Number)
  @IsOptional()
  @IsInt()
  size : number;


}
