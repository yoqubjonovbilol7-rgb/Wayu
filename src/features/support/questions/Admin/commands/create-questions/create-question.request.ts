import {IsString, MaxLength} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";

export class CreateQuestionRequest {
    @IsString()
    @MaxLength(64)
    @ApiProperty()
    fullName!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @IsString()
    @MaxLength(2000)
    @ApiProperty()
    question!: string;
}
