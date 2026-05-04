import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class GetAllEventsResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    categoryId!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    content!: string;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    date!: string;

    @Expose()
    @ApiProperty()
    address!: string;
}