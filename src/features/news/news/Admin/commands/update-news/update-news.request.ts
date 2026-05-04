import { ApiProperty } from '@nestjs/swagger';
import { IsDateString, IsNumber, IsOptional, IsString, MaxLength, Min } from 'class-validator';
import { Type } from 'class-transformer';

export class UpdateNewsRequest {
  @ApiProperty()
  @IsOptional()
  @IsString()
  @MaxLength(256)
  title?: string;

  @ApiProperty()
  @IsOptional()
  @IsString()
  content?: string;

  @ApiProperty({type: 'string', format: 'binary',})
  @IsOptional()
  image? : Express.Multer.File

  @ApiProperty()
  @IsOptional()
  @Type(() => Number)
  @Min(1)
  @IsNumber()
  categoryId?: number;

  @IsOptional()
  @Type(() => Number)
  @IsNumber()
  countryId?: number;

  @ApiProperty()
  @IsOptional()
  @IsDateString()
  date?: string;
}