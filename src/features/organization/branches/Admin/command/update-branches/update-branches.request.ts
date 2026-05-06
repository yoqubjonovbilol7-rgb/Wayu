import {ApiProperty, ApiPropertyOptional} from '@nestjs/swagger';
import {IsInt, IsNumber, IsString, MaxLength} from "class-validator";

export class UpdateBranchRequest {

  @IsInt()
  @ApiProperty()
  countryId?: number;

  @ApiPropertyOptional()
  @IsInt()
  representativeId?: number;

  @ApiProperty()
  @IsString()
  city?: string;

  @ApiPropertyOptional()
  @IsNumber()
  latitude?: number;

  @ApiProperty()
  @IsNumber()
  longitude?: number;

  @ApiProperty()
  @IsString()
  @MaxLength(16)
  phoneNumber?: string;
}