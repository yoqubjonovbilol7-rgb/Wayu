import { ApiProperty } from "@nestjs/swagger";
import { Type } from "class-transformer";
import { IsInt, IsOptional, IsString } from "class-validator";

export class CreateBookRequest {
    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    authorId: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    categoryId: number;

    @ApiProperty()
    @IsString()
    title: string;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    pages: number;

    @ApiProperty()
    @Type(() => Number)
    @IsInt()
    year: number;

    @ApiProperty({ required: false })
    @IsOptional()
    @IsString()
    description?: string;
}