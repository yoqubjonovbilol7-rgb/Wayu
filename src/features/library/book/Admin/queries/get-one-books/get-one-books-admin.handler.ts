import {IQueryHandler, QueryHandler} from "@nestjs/cqrs";
import {plainToInstance} from "class-transformer";
import {NotFoundException} from "@nestjs/common";
import {GetOneBooksAdminQuery} from "./get-one-books-admin.query";
import {Book} from "@/features/library/book/book.entity";
import {GetOneBooksAdminResponse} from "./get-one-books-admin.response";

@QueryHandler(GetOneBooksAdminQuery)
export class GetOneBooksAdminHandler implements IQueryHandler<GetOneBooksAdminQuery> {

    async execute(query: GetOneBooksAdminQuery): Promise<GetOneBooksAdminResponse> {
        const book = await Book.findOne({where: { id: query.id }});
        if (!book) {
            throw new NotFoundException('Book not found');
        }

        return plainToInstance(GetOneBooksAdminResponse, book, {excludeExtraneousValues: true});
    }
}