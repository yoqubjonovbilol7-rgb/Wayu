import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class UpdateInstagramPostResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty({type : "string", format: "binary"})
    image!: string;

    @Expose()
    @ApiProperty()
    link!: string;
}