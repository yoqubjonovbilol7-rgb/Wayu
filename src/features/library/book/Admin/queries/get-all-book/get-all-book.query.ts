import {Command} from "@nestjs/cqrs";
import {GetAllBookResponse} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.response";
import {GetAllBookFilters} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.filters";

export class GetAllBookQuery extends Command<GetAllBookResponse[]>{
  constructor(public readonly filters: GetAllBookFilters) {
    super();
  }
}