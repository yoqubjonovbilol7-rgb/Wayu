import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class InstagramPostsResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty()
    link!: string;
}

export class GetAllInstagramPostsResponse {
    @Expose()
    @ApiProperty({type: [InstagramPostsResponse]})
    data!: InstagramPostsResponse[];

    @Expose()
    @ApiProperty()
    total!: number;
}