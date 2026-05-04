import {IsInt, IsOptional} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class GetAllFaqsFilters {
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