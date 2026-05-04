import {IsOptional, IsString, IsUrl, MaxLength} from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateInstagramPostRequest {


    @ApiProperty({ type: 'string', format: 'binary'})
    @IsOptional()
    @IsUrl()
    image!: Express.Multer.File;

    @ApiProperty()
    @IsString()
    @MaxLength(128)
    @ApiProperty()
    link: string;
}