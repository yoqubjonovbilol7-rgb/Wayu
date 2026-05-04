import {Command} from "@nestjs/cqrs";
import {GetAllBookFilters} from "@/features/library/book/Admin/queries/get-all-book/get-all-book.filters";
import {GetAllStaticInfoResponse} from "@/features/info/static-info/Admin/queries/get-all-static-info/get-all-static-info.response";

export class GetAllStaticInfoQuery extends Command<GetAllStaticInfoResponse[]>{
  constructor(public readonly filters : GetAllBookFilters) {
    super();
  }
}