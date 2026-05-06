import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import { Type } from 'class-transformer';

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

    @ApiProperty({ type: 'string', format: 'binary' })
    imagePath!: Express.Multer.File;


    @ApiProperty({ type: 'string', format: 'binary' })
    filePath!: Express.Multer.File;

    @IsInt()
    @ApiProperty()
    pages!: number;

    @IsInt()
    @Type(() => Number)
    @ApiProperty()
    year!: number;
}