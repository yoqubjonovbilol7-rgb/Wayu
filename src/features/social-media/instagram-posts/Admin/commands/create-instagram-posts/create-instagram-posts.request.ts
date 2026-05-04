import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateInstagramPostsRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    link!: string;
}