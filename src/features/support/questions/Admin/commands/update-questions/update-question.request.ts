import {IsOptional, IsString, MaxLength, IsEnum} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {QuestionStatus} from "@/core/enums/paymentProvider.enum";

export class UpdateQuestionRequest {

    @IsString()
    @IsOptional()
    @MaxLength(64)
    @ApiProperty({required: false})
    fullName?: string;

    @IsString()
    @IsOptional()
    @MaxLength(16)
    @ApiProperty({required: false})
    phoneNumber?: string;

    @IsString()
    @IsOptional()
    @MaxLength(2000)
    @ApiProperty({required: false})
    question?: string;

    @IsEnum(QuestionStatus)
    @IsOptional()
    @ApiProperty({enum: QuestionStatus, required: false})
    status?: QuestionStatus;
}
