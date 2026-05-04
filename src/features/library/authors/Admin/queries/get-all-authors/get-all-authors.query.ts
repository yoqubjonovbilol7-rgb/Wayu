import {Query} from "@nestjs/cqrs";
import {GetAllAuthorsResponse} from "@/features/library/authors/Admin/queries/get-all-authors/get-all-authors.response";
import {GetAllAuthorsFilters} from "@/features/library/authors/Admin/queries/get-all-authors/get-all-authors.filters";

export class GetAllAuthorsQuery extends Query<GetAllAuthorsResponse[]>{
    constructor(public readonly filters: GetAllAuthorsFilters) {
        super();
    }

}