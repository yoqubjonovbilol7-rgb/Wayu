import { Query } from '@nestjs/cqrs';
import { GetAllBooksFilters } from '@/features/library/book/Admin/queries/get-all-books/get-all-books.filters';
import { BooksResponse } from '@/features/library/book/Admin/queries/get-all-books/get-all-books.response';

;
export class GetAllBooksQuery extends Query<BooksResponse[]> {
    constructor(public readonly filters: GetAllBooksFilters) {
        super();
    }
}