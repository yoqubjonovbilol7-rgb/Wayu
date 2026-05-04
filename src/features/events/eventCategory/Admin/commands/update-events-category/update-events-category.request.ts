import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateEventsCategoryRequest {

    @IsString()
    @IsOptional()
    @MaxLength(64)
    @ApiProperty()
    title!: string;
}