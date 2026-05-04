import { ApiProperty } from "@nestjs/swagger";
import { Allow, IsInt, IsString, MaxLength, Min, IsNotEmpty } from "class-validator";
import { Type } from "class-transformer";

export class CreateEventRequest {
    @IsInt()
    @Min(1)
    @Type(() => Number)
    @ApiProperty()
    categoryId!: number;

    @IsString()
    @IsNotEmpty()
    @MaxLength(256)
    @ApiProperty()
    title!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    content!: string;

    @Allow()
    @ApiProperty({ type: "string", format: "binary" })
    image!: string;

    @IsString()
    @IsNotEmpty()
    @ApiProperty()
    date!: string;

    @IsString()
    @IsNotEmpty()
    @MaxLength(128)
    @ApiProperty()
    address!: string;
}