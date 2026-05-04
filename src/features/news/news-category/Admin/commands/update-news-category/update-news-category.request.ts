import {IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateNewsCategoryRequest {

    @IsString()
    @IsOptional()
    @MaxLength(64)
    @ApiProperty({required: false})
    title?: string;
}