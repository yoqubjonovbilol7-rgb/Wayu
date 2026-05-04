import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class GetAllEventsFilters {
    @IsInt()
    @IsOptional()
    @ApiProperty({ required: false, default: 1 })
    page?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({ required: false, default: 10 })
    size?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({ required: false })
    categoryId?: number;

    @IsString()
    @IsOptional()
    @ApiProperty({ required: false })
    search?: string;
}