import {IsInt, IsOptional} from "class-validator";
import {Type} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class GetAllBookCategoryFilters {
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required : false})
    page? : number

    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required : false})
    size? : number
}