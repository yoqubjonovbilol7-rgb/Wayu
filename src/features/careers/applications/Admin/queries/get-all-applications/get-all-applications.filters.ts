import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsEnum, IsInt, IsOptional, IsString, Min } from "class-validator";
import { ApplicationStatus } from "@/core/enums/paymentProvider.enum";

export class GetAllApplicationsFilters {
  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  fullName?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  email?: string;

  @IsString()
  @IsOptional()
  @ApiProperty({ required: false })
  phoneNumber?: string;

  @IsInt()
  @IsOptional()
  @Type(() => Number)
  @ApiProperty({ required: false })
  vacancyId?: number;

  @IsEnum(ApplicationStatus)
  @IsOptional()
  @ApiProperty({ required: false, enum: ApplicationStatus })
  status?: ApplicationStatus;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ required: false })
  page?: number;

  @IsInt()
  @IsOptional()
  @Min(1)
  @Type(() => Number)
  @ApiProperty({ required: false })
  limit?: number;
}
