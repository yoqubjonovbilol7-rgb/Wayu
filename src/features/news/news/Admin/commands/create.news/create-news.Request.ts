import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateNewsRequest {
  @ApiProperty()
  @IsString()
  @MaxLength(256)
  title!: string;

  @ApiProperty()
  @IsString()
  content!: string;

  @ApiProperty({ type: 'string', format: 'binary' })
  image!: string;

  @ApiProperty()
  @Type(() => Number)
  @Min(1)
  @IsNumber()
  categoryId!: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  countryId?: number;

  @ApiProperty()
  @IsDateString()
  date!: string;
}