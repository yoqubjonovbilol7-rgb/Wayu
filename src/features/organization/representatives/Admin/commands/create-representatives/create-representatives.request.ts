import {IsNotEmpty, IsOptional, IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateRepresentativesRequest {

    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    @ApiProperty()
    fullName: string;

    @ApiProperty({type: "string", format: "binary"})
    @IsOptional()
    image: Express.Multer.File;

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    resume: string;
}