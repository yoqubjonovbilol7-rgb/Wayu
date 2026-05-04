import {IsInt, IsOptional} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class GetAllLanguageFilters {
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