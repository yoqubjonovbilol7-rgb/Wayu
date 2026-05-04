import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsOptional} from "class-validator";

export class GetAllNewsFilters {
    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    page?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    size?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({required: false})
    categoryId?: number;
}