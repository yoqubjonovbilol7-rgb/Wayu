import { plainToInstance } from 'class-transformer';
import type { IQueryHandler } from '@nestjs/cqrs';
import { QueryHandler } from '@nestjs/cqrs';
import { GetAllBooksQuery } from './get-all-books.query';
import { BooksResponse} from './get-all-books.response';
import { Book } from '@/features/library/book/book.entity';



@QueryHandler(GetAllBooksQuery)
export class GetAllBooksHandler implements IQueryHandler<GetAllBooksQuery> {
  async execute(query: GetAllBooksQuery): Promise<BooksResponse[]> {
    const take = query.filters.size ?? 10;
    const currentPage = query.filters.page ?? 1;
    const skip = (currentPage - 1) * take;

    const data = await Book.findAndCount({ skip, take });
    return plainToInstance(BooksResponse, data, { excludeExtraneousValues: true });
  }
}