import { ApiProperty } from "@nestjs/swagger";
import { IsInt, IsNotEmpty, IsNumber, IsString, MaxLength } from "class-validator";
import { Type } from "class-transformer";

export class CreateBranchesRequest {
    @ApiProperty({ type: Number })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    countryId!: number;

    @ApiProperty({ type: Number })
    @Type(() => Number)
    @IsInt()
    @IsNotEmpty()
    representativeId!: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(64)
    city!: string;

    @ApiProperty({ type: Number })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    latitude!: number;

    @ApiProperty({ type: Number })
    @Type(() => Number)
    @IsNumber()
    @IsNotEmpty()
    longitude!: number;

    @ApiProperty()
    @IsString()
    @IsNotEmpty()
    @MaxLength(16)
    phoneNumber!: string;
}