import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsUrl, MaxLength} from "class-validator";
import {Expose} from "class-transformer";

export class UpdateInstagramPostRequest {

    @IsOptional()
    @ApiProperty({type : "string", format: "binary"})
    image!: string;



    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    @MaxLength(128)
    link?: string;
}