import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class GetAllLanguageResponse {
    @Expose()
    @ApiProperty()
    id! : number

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    created!: string;
}