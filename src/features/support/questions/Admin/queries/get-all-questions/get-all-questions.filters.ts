import {ApiProperty} from "@nestjs/swagger";
import {IsInt, IsOptional, IsEnum} from "class-validator";
import {Type} from "class-transformer";
import {QuestionStatus} from "@/core/enums/paymentProvider.enum";

export class GetAllQuestionsFilters {
    @IsInt()
    @IsOptional()
    @Type(() => Number)
    @ApiProperty({required: false})
    page?: number;

    @IsInt()
    @Type(() => Number)
    @IsOptional()
    @ApiProperty({required: false})
    size?: number;

    @IsEnum(QuestionStatus)
    @IsOptional()
    @ApiProperty({enum: QuestionStatus, required: false})
    status?: QuestionStatus;
}
