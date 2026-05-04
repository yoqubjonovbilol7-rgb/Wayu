import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString, MaxLength, Min } from "class-validator";
import { Type } from "class-transformer";

export class UpdateEventsRequest {
    @IsOptional()
    @IsInt()
    @Min(1)
    @Type(() => Number)
    @ApiProperty({ required: false })
    categoryId?: number;

    @IsOptional()
    @IsString()
    @MaxLength(256)
    @ApiProperty({ required: false })
    title?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    content?: string;

    @IsOptional()
    @IsString()
    @ApiProperty({ required: false })
    date?: string;

    @IsOptional()
    @IsString()
    @MaxLength(512)
    @ApiProperty({ required: false })
    address?: string;

    @IsOptional()
    @ApiProperty({
        type: 'string',
        format: 'binary',
        required: false
    })
    image?: string;
}