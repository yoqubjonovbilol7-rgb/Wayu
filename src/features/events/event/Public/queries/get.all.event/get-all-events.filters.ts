import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsOptional, IsString } from "class-validator";

export class GetAllEventsFilters {
    @IsInt()
    @IsOptional()
    @ApiProperty({ required: false })
    page?: number;

    @IsInt()
    @IsOptional()
    @ApiProperty({ required: false })
    size?: number;

}