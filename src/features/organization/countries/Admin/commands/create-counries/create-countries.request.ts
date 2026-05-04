import {IsInt, IsOptional, IsString, MaxLength, Min} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {Type} from "class-transformer";

export class CreateCountriesRequest {

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title! : string

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    flag! : string
}