import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsOptional} from "class-validator";
import {Type} from "class-transformer";

export class GetAllTagsFilters {
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false})
    page?: number;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @ApiProperty({required: false})
    size?: number
}