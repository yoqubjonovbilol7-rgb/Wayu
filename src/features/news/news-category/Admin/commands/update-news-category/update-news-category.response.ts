import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateNewsCategoryResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty({required: false})
    image?: string;
}