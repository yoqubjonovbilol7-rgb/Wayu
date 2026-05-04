import {Expose} from "class-transformer";
import {ApiProperty} from "@nestjs/swagger";

export class CreateNewsResponse {
    @Expose()
    @ApiProperty()
    id! : number

    @Expose()
    @ApiProperty()
    title! : string

    @Expose()
    @ApiProperty({type: 'string', format: 'binary'})
    image! : string

    @Expose()
    @ApiProperty()
    content! :string

    @Expose()
    @ApiProperty()
    date! :string

    @Expose()
    @ApiProperty()
    categoryId : number

    @Expose()
    @ApiProperty()
    countryId: number
}