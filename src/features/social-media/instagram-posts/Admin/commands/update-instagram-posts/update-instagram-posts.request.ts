import {IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateInstagramPostsRequest {
    @IsString()
    @IsOptional()
    @MaxLength(256)
    @ApiProperty({required: false})
    link?: string;
}