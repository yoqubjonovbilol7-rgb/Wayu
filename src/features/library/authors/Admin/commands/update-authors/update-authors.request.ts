import {IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateAuthorsRequest {

    @ApiProperty()
    @IsString()
    @IsOptional()
    @MaxLength(64)
    fullName?: string;
}