import {IsString, MaxLength, IsEnum} from "class-validator";
import {ApiProperty} from "@nestjs/swagger";
import {VacancyType} from "@/core/enums/paymentProvider.enum";

export class CreateVacanciesRequest {
    @IsString()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsString()
    @MaxLength(128)
    @ApiProperty()
    address!: string;

    @IsString()
    @ApiProperty()
    description!: string;

    @IsString()
    @MaxLength(16)
    @ApiProperty()
    phoneNumber!: string;

    @IsEnum(VacancyType)
    @ApiProperty({enum: VacancyType})
    type!: VacancyType;

    @IsString()
    @MaxLength(64)
    @ApiProperty()
    salary!: string;
}
