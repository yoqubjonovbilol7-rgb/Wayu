import {IsInt, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateCountriesRequest {

    @IsOptional()
    @IsInt()
    id?: number;

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    title? : string

    @ApiProperty({ type: 'string', format: 'binary' })
    @IsOptional()
    flag? : any
}