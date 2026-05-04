import {ApiProperty} from "@nestjs/swagger";
import {Expose} from "class-transformer";

export class BooksResponse {
    @Expose()
    @ApiProperty()
    id!: number;

    @Expose()
    @ApiProperty()
    authorId!: number;

    @Expose()
    @ApiProperty()
    categoryId!: number;

    @Expose()
    @ApiProperty()
    title!: string;

    @Expose()
    @ApiProperty()
    image!: string;

    @Expose()
    @ApiProperty({required: false})
    description?: string;

    @Expose()
    @ApiProperty()
    file!: string;

    @Expose()
    @ApiProperty()
    pages!: number;

    @Expose()
    @ApiProperty()
    year!: number;
}

export class GetAllBooksResponse {
    @Expose()
    @ApiProperty({type: [BooksResponse]})
    data!: BooksResponse[];

    @Expose()
    @ApiProperty()
    total!: number;
}