import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateBooksRequest {
    @IsInt()
    @ApiProperty()
    authorId!: number;

    @IsInt()
    @ApiProperty()
    categoryId!: number;

    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    description?: string;

    @IsInt()
    @ApiProperty()
    pages!: number;

    @IsInt()
    @ApiProperty()
    year!: number;
}