import { IsOptional, IsString, MaxLength } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateFaqsRequest {

    @IsString()
    @IsOptional()
    @MaxLength(256)
    @ApiProperty()
    question?: string;

    @IsString()
    @IsOptional()
    @MaxLength(512)
    @ApiProperty()
    answer?: string;
}