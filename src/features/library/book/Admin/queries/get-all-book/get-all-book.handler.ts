import { IQueryHandler, QueryHandler } from '@nestjs/cqrs';


import { Book } from '@/features/library/book/book.entity';
import { plainToInstance } from 'class-transformer';
import {GetAllBookQuery} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.query";
import {GetAllBookResponse} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.response";

@QueryHandler(GetAllBookQuery)
export class GetAllBookHandler implements IQueryHandler<GetAllBookQuery> {
  async execute(query: GetAllBookQuery,): Promise<GetAllBookResponse[]> {
    const take = query.filters?.size ?? 10;
    const currentPage = query.filters?.page ?? 1;
    const skip = (currentPage - 1) * take;

    const books = await Book.find({relations: ['author', 'category'], skip, take});

    return plainToInstance(GetAllBookResponse, books, {excludeExtraneousValues: true,});
  }
}