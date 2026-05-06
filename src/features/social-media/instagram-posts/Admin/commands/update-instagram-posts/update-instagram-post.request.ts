import {ApiProperty} from "@nestjs/swagger";
import {IsOptional, IsUrl, MaxLength} from "class-validator";

export class UpdateInstagramPostRequest {

    @IsOptional()
    @ApiProperty({type : "string", format: "binary"})
    image!: Express.Multer.File;



    @ApiProperty({ required: false })
    @IsOptional()
    @IsUrl()
    @MaxLength(128)
    link?: string;
}