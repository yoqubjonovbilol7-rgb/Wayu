import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsOptional, IsBoolean} from "class-validator";
import {Type} from "class-transformer";

export class GetAllVacanciesFilters {
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false})
    page?: number;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @ApiProperty({required: false})
    size?: number;

    @IsBoolean()
    @IsOptional()
    @Type(() => Boolean)
    @ApiProperty({required: false})
    isActive?: boolean;
}
