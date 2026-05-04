import {plainToInstance} from "class-transformer";
import type {IQueryHandler} from "@nestjs/cqrs";
import {QueryHandler} from "@nestjs/cqrs";
import {GetAllBooksQuery} from "./get-all-books.query";
import {GetAllBooksResponse} from "./get-all-books.response";
import {Book} from "@/features/library/book/book.entity";


@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksQuery> {
    async execute(query: GetAllBooksQuery): Promise<GetAllBooksResponse> {
        const take = query.filters.limit ?? 10;
        const currentPage = query.filters.page ?? 1;
        const skip = (currentPage - 1) * take;

        const [data, total] = await Book.findAndCount({skip, take});
        return plainToInstance(GetAllBooksResponse, {data, total}, {excludeExtraneousValues: true});
    }
}