import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class GetOneLanguagePublicResponse {

    @Expose()
    @ApiProperty()
    id! : number

    @Expose()
    @ApiProperty()
    title! : string
}