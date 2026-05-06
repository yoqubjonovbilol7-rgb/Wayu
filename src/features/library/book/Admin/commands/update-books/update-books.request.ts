import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateBooksRequest {
    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    authorId?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    categoryId?: number;

    @IsString()
    @IsOptional()
    @MaxLength(256)
    @ApiProperty({required: false})
    title?: string;

    @IsString()
    @IsOptional()
    @ApiProperty({required: false})
    description?: string;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    pages?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    year?: number;

  @ApiProperty({ type: 'string', format: 'binary' })
  imagePath!: Express.Multer.File;


  @ApiProperty({ type: 'string', format: 'binary' })
  filePath!: Express.Multer.File;
}